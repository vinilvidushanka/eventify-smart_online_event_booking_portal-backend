/*
import {Router} from "express";
import {authenticateUser} from "../controllers/auth.controller";
import {authorizeRoles} from "../middleware/auth.middleware";
import {saveUser} from "../services/auth.service";

const authRouter = Router();

authRouter.post("/login",authenticateUser);
authRouter.post("/save",authorizeRoles ("organizer"),saveUser);

export default authRouter;*/

import { Router } from "express";
import {
    authenticateUser,
    saveUser,
    refreshToken,
    logout, getAllUsers,
} from "../controllers/auth.controller";
import {authenticateToken, authorizeRoles} from "../middleware/auth.middleware";

const authRouter = Router();

authRouter.post("/login", authenticateUser);
authRouter.post("/register", saveUser);
authRouter.post("/refresh-token", refreshToken);
authRouter.post("/logout", logout);
authRouter.get("/all",authenticateToken, authorizeRoles("organizer"),getAllUsers);

export default authRouter;
