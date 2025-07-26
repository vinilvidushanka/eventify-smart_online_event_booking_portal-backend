/*
import {Request,Response} from "express";
import * as authService from "../services/auth.service"

export const authenticateUser = async (req:Request,res:Response)=>{
    console.log("Login Request Body:", req.body);
    const {username,password} = req.body;
    const authTokens =await authService.authenticateUser(username,password)

    if (!authTokens){
        console.log(username,password);
        res.status(401).json({error:"Invalid username or password"});
        return;
    }
    console.log(username,password);
    res.json(authTokens);
}

export const saveUser = async (req:Request,res:Response)=>{
    try {
        const newUser = req.body;
        const validationError = await authService.validateUsers(newUser);
        if (validationError) {
            res.status(400).json({error: validationError});
            return;
        }
        const saveUser = await authService.saveUser(newUser);
        res.status(201).json(saveUser);
    }catch (error){

    }
}*/

import { Request, Response } from "express";
import * as authService from "../services/auth.service";

/**
 * 🔐 Login Controller
 */
export const authenticateUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const authTokens = await authService.authenticateUser(username, password);

        if (!authTokens) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        return res.status(200).json(authTokens);
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

/**
 * ➕ Register Controller
 */
export const saveUser = async (req: Request, res: Response) => {
    try {
        const newUser = req.body;
        const validationError = await authService.validateUsers(newUser);

        if (validationError) {
            return res.status(400).json({ error: validationError });
        }

        const savedUser = await authService.saveUser(newUser);
        return res.status(201).json(savedUser);
    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

/**
 * 🔁 Refresh Access Token Controller
 */
export const refreshToken = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(400).json({ error: "Refresh token is required" });
        }

        const newAccessToken = authService.refreshAccessToken(refreshToken);

        if (!newAccessToken) {
            return res.status(403).json({ error: "Invalid refresh token" });
        }

        return res.status(200).json(newAccessToken);
    } catch (error) {
        console.error("Refresh Token Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

/*export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await authService.getAllUsers();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};*/

/**
 * 🚪 Logout Controller
 */
export const logout = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(400).json({ error: "Refresh token is required" });
        }

        authService.logoutUser(refreshToken);
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
