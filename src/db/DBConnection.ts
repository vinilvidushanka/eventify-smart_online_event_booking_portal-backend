import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const  MONGO_DB_URL = process.env.MONGO_DB_URL as string;

const DBConnection = async () => {
    try {
        if (!MONGO_DB_URL) {
            return "MongoDB connection error: MONGODB_URL is not defined";
        }else {
            const connection = await mongoose.connect(MONGO_DB_URL);
            return `Successfully connected to MongoDB ${connection.connection?.host}`;
        }
    }catch (error) {
        return "MongoDB connection error: "+error;
    }
}

export default DBConnection