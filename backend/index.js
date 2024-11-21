import express from 'express';
import connectDB from './config/mongodb.js'
import teacherRoutes from './routes/teacher.js';
import positionRoutes from './routes/teacherPosition.js';
import cors from 'cors'

const app = express()
const port = 4000
connectDB();

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
    ],
    credentials: true,

}))

app.use('/teachers', teacherRoutes)
app.use('/positions', positionRoutes)

app.listen(port, () => {
    console.log('Server started on PORT:' + port)
})