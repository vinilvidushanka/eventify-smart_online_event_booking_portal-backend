import { Router } from "express";
import { createPayment, getPayments } from "../controllers/payment.controller";
import {authorizeRoles} from "../middleware/auth.middleware";

const paymentRouter = Router();

paymentRouter.post("/save", createPayment);
paymentRouter.get("/getAll",authorizeRoles("organizer"), getPayments);

export default paymentRouter;
