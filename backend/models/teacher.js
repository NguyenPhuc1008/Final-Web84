import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    code: { type: String, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    teacherPositionsId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TeacherPosition' }],
    degrees: [
        {
            type: { type: String, required: true },
            school: { type: String, required: true },
            major: { type: String },
            year: { type: Number },
            isGraduated: { type: Boolean, default: false }
        }
    ]
});

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher