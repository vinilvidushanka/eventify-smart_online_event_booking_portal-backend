
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
