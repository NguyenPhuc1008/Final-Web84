import express from 'express';
import { createTeacher, listTeachers } from '../controller/teacher.js';

const teacherRoutes = express.Router();

teacherRoutes.get('/list-teachers', listTeachers)
teacherRoutes.post('/add-teacher', createTeacher)


export default teacherRoutes