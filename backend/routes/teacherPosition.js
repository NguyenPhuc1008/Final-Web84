import express from 'express';
import { createTeacherPositions, listTeacherPositions } from '../controller/teacherPosition.js';

const positionRoutes = express.Router();

positionRoutes.get('/list-positions', listTeacherPositions)
positionRoutes.post('/add-position', createTeacherPositions)


export default positionRoutes