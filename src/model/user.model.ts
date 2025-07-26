import mongoose from "mongoose";

export interface UserType {
    id: number;
    username: string;
    email: string;
    password: string;
    role: "organizer" | "customer" | "admin";
}

const UserModel = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
        index: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", UserModel);
export default User;
