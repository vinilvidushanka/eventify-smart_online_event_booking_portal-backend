import { Request, Response } from "express";
import { PaymentModel } from "../model/payment.model";

export const createPayment = async (req: Request, res: Response) => {
    try {
        const paymentData = req.body;
        const payment = new PaymentModel(paymentData);
        await payment.save();
        res.status(201).json(payment);
    } catch (error) {
        console.error("Error saving payment:", error);
        res.status(500).json({ message: "Failed to save payment" });
    }
};

export const getPayments = async (_req: Request, res: Response) => {
    try {
        const payments = await PaymentModel.find();
        res.status(200).json(payments);
    } catch (error) {
        console.error("Error fetching payments:", error);
        res.status(500).json({ message: "Failed to fetch payments" });
    }
};
