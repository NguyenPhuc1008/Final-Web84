import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on("connected", () => {
        console.log("DB connected")
    })
    await mongoose.connect("mongodb+srv://phucn1008:phucn1008@mindx-fullstack.andph.mongodb.net/final-web84")
}
export default connectDB
