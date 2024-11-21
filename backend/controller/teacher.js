import Teacher from "../models/teacher.js"
import TeacherPosition from "../models/teacherPosition.js";
import User from "../models/user.js"


const generateUniqueCode = async (Model, fieldName) => {
    const generateCode = () => {
        return Math.floor(1000000000 + Math.random() * 9000000000).toString(); // Generate 10-digit random number
    };

    let code;
    let exists = true;

    do {
        code = generateCode();
        exists = await Model.exists({ [fieldName]: code });
    } while (exists);

    return code;
};

const listTeachers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit

        const teachers = await Teacher.find({})
            .populate({
                path: 'userId',
                select: 'name email phoneNumber isActive address'
            })
            .populate({
                path: 'teacherPositionsId',
                select: 'name'
            })
            .select('code degrees isActive userId teacherPositionsId').skip(skip).limit(limit)
        const formattedTeachers = teachers.map(teacher => ({
            code: teacher.code,
            isActive: teacher.isActive,
            name: teacher.userId?.name,
            email: teacher.userId?.email,
            phoneNumber: teacher.userId?.phoneNumber,
            address: teacher.userId?.address,
            positions: teacher.teacherPositionsId.map(pos => pos.name),
            degrees: teacher.degrees.map(degree => ({
                type: degree.type,
                school: degree.school,
                major: degree.major
            }))
        }));

        res.json({
            success: true,
            teacher: formattedTeachers,
            pagination: {
                page,
                limit,
                total: Math.ceil(await Teacher.countDocuments() / limit)
            }
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

const createTeacher = async (req, res) => {
    try {
        const { name, email, phoneNumber, address, dob, identity, role, degrees, teacherPositionsId, startDate, endDate } = req.body;
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.json({
                success: false,
                message: 'Email da ton tai'
            })
        }
        const newUser = new User({
            name,
            email,
            phoneNumber,
            address,
            dob,
            identity,
            role: 'TEACHER'
        })
        await newUser.save()

        const code = await generateUniqueCode(Teacher, 'code')

        const newTeacher = new Teacher({
            userId: newUser._id,
            code,
            degrees,
            teacherPositionsId,
            startDate,
            endDate
        })
        await newTeacher.save();

        res.json({
            success: true,
            message: 'Tao giao vien thanh cong',
            teacher: {
                id: newTeacher._id,
                code: newTeacher.code,
                user: newUser,
                degrees: newTeacher.degrees,
                teacherPositionsId: newTeacher.teacherPositionsId
            }
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}
const getTeacherPosition = async (req, res) => {
    try {
        const positions = await TeacherPosition.find({});
        const options = positions.map((position) => ({
            value: position._id,
            label: position.name
        }))

        res.json({
            success: true,
            data: options
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

export { listTeachers, createTeacher, getTeacherPosition }