import mongoose from "mongoose";

const teacherPositionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    des: { type: String },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false }
});

const TeacherPosition = mongoose.model('TeacherPosition', teacherPositionSchema);

export default TeacherPosition