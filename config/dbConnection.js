import mongoose from "mongoose";
import 'dotenv/config';
const dbURI = process.env.MONGO_URI;
const connectDB = async()=>{
    try{
        const connect = await mongoose.connect(dbURI);
        console.log("DB Connected", connect.connection.name);
    }catch(err){
        throw new Error("Can't connect database");
    }
}

export default connectDB;