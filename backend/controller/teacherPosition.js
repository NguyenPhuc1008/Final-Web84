import TeacherPosition from "../models/teacherPosition.js"

const listTeacherPositions = async (req, res) => {
    try {
        const positions = await TeacherPosition.find({}).select('-isDeleted')
        res.json({
            success: true,
            positions
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

const createTeacherPositions = async (req, res) => {
    try {

        const { name, code, des, isActive } = req.body

        const existingPosition = await TeacherPosition.findOne({ code });
        if (existingPosition) {
            return res.json({
                success: true,
                message: 'Code da ton tai'
            })
        }
        const newPosition = new TeacherPosition({
            name,
            code,
            des,
            isActive: isActive === 'true' ? true : false
        })
        await newPosition.save()

        res.json({
            success: true,
            message: 'Tao vi tri cong tac thanh cong',
            position: newPosition
        })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

export { listTeacherPositions, createTeacherPositions }