/*
import User from "../model/user.model";
import type { UserType } from "../model/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {UserDto} from "../dto/user.dto";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

const refreshTokens = new Set();

const organizerUser:UserType ={
    id:1,
    username:"mainOrganizer",
    email:"mainOrganizer@gmail.com",
    password: bcrypt.hashSync("1234",10),
    role:"organizer"
}

const customerUser:UserType={
    id:2,
    username:"customer",
    email:"customer@gmail.com",
    password: bcrypt.hashSync("1234",10),
    role:"customer"
}

const userList:User[] = [organizerUser,customerUser];
userList.push(organizerUser);
userList.push(customerUser);

/!*
export const authenticateUser = (username:string,password:string) => {
    const existingUser = userList.find(user =>user.username === username);

    if (!existingUser || !bcrypt.compareSync(password,existingUser.password)){
        return null;
    }

    const accessToken = jwt.sign({
        id:existingUser.id,
        username:existingUser.username,
        role:existingUser.role
    },JWT_SECRET,{expiresIn:"5m"});

    const refreshToken = jwt.sign({
        username:existingUser.username
    },REFRESH_TOKEN_SECRET,{expiresIn:"7d"});

    refreshTokens.add(refreshToken);
    return {accessToken,refreshToken};

}*!/

export const authenticateUser = (username: string, password: string) => {
    // Allow login by username or email
    const existingUser = userList.find(
        user => user.username === username || user.email === username
    );

    if (!existingUser || !bcrypt.compareSync(password, existingUser.password)) {
        return null;
    }

    const accessToken = jwt.sign(
        {
            id: existingUser.id,
            username: existingUser.username,
            role: existingUser.role
        },
        JWT_SECRET,
        { expiresIn: "5m" }
    );

    const refreshToken = jwt.sign(
        {
            username: existingUser.username
        },
        REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    );

    refreshTokens.add(refreshToken);
    return { accessToken, refreshToken };
}

export const saveUser = async (user : UserDto):Promise<UserDto> => {
    return await User.create(user);
}

export const validateUsers = async (user : UserDto):Promise<string | null> => {
    if (!user.username || !user.email || !user.password || !user.role) {
        return "All fields are required";
    }
    return null;
}*/


import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/user.model";
import type { UserType } from "../model/user.model";
import { UserDto } from "../dto/user.dto";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

const refreshTokens = new Set<string>();

// 🔹 Dev/Test-only static users (can remove in production)
const organizerUser: UserType = {
    id: 1,
    username: "mainOrganizer",
    email: "mainOrganizer@gmail.com",
    password: bcrypt.hashSync("1234", 10),
    role: "organizer",
};

const customerUser: UserType = {
    id: 2,
    username: "customer",
    email: "customer@gmail.com",
    password: bcrypt.hashSync("1234", 10),
    role: "customer",
};

const testUsers: UserType[] = [organizerUser, customerUser];

/**
 * 🔐 Authenticate a user by username or email and password
 */
export const authenticateUser = async (usernameOrEmail: string, password: string) => {
    const existingUser =
        testUsers.find(
            (user) => user.username === usernameOrEmail || user.email === usernameOrEmail
        ) ||
        (await User.findOne({
            $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
        }));

    if (!existingUser || !bcrypt.compareSync(password, existingUser.password)) {
        return null;
    }

    const accessToken = jwt.sign(
        {
            id: existingUser.id,
            username: existingUser.username,
            role: existingUser.role,
        },
        JWT_SECRET,
        { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
        {
            username: existingUser.username,
        },
        REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    );

    refreshTokens.add(refreshToken);
    return { accessToken, refreshToken };
};

/**
 * ✅ Validate user data before saving
 */
export const validateUsers = async (user: UserDto): Promise<string | null> => {
    if (!user.username || !user.email || !user.password || !user.role) {
        return "All fields are required";
    }

    const existing = await User.findOne({
        $or: [{ username: user.username }, { email: user.email }],
    });

    if (existing) return "Username or Email already exists";
    return null;
};

/**
 * 📝 Save a new user to DB (with hashed password)
 */
export const saveUser = async (user: UserDto): Promise<UserDto> => {
    const hashedPassword = bcrypt.hashSync(user.password, 10);

    const newUser = await User.create({
        id: Date.now(), // You can use auto-increment plugin or custom UUID later
        username: user.username,
        email: user.email,
        password: hashedPassword,
        role: user.role,
    });

    return newUser;
};

/**
 * 🔁 Validate refresh token and generate new access token
 */
export const refreshAccessToken = (refreshToken: string) => {
    if (!refreshToken || !refreshTokens.has(refreshToken)) {
        return null;
    }

    try {
        const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as { username: string };
        const accessToken = jwt.sign(
            {
                username: decoded.username,
            },
            JWT_SECRET,
            { expiresIn: "15m" }
        );
        return { accessToken };
    } catch (err) {
        return null;
    }
};

/*export const getAllUsers = async (): Promise<UserDto[]> => {
    const users = await User.find(); // ✅ returns an array of UserDocuments

    return users.map((user) => {
        const plainUser = user.toObject(); // 🟡 recommended if using mongoose types
        return {
            id: plainUser.id,
            username: plainUser.username,
            email: plainUser.email,
            password: "", // 🔐 hide password
            role: plainUser.role
        };
    });
};*/

/**
 * 🚪 Logout user
 */
export const logoutUser = (refreshToken: string) => {
    refreshTokens.delete(refreshToken);
};
