import {Router} from "express";
import {authenticateUser} from "../controllers/auth.controller";
import {authorizeRoles} from "../middleware/auth.middleware";
import {saveUser} from "../services/auth.service";

const authRouter = Router();

authRouter.post("/login",authenticateUser);
authRouter.post("/save",authorizeRoles ("organizer"),saveUser);

export default authRouter;