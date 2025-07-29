/*
import { PaymentModel } from "../model/payment.model";
import { PaymentDTO } from "../dto/payment.dto";

// Save new payment record
export const savePayment = async (paymentDto: PaymentDTO) => {
    return await PaymentModel.create(paymentDto);
};

// Get all payment records
export const getAllPayments = async () => {
    return await PaymentModel.find().sort({ createdAt: -1 });
};

// Get payment by ID
export const getPaymentById = async (paymentId: string) => {
    return await PaymentModel.findById(paymentId);
};

// Update payment by ID (optional)
export const updatePayment = async (paymentId: string, data: Partial<PaymentDTO>) => {
    const payment = await PaymentModel.findByIdAndUpdate(paymentId, data, { new: true });
    return payment || null;
};

// Delete payment by ID (optional)
export const deletePayment = async (paymentId: string) => {
    await PaymentModel.findByIdAndDelete(paymentId);
    return true;
};

// Validate payment data (basic example)
/!*export const validatePayment = async (payment: PaymentDTO): Promise<string | null> => {
    if (!payment.totalAmount || !payment.paidBy || !payment.tickets || payment.tickets.length === 0) {
        return "Total amount, paidBy and tickets are required";
    }
    // Add any other validation you want here
    return null;
};*!/
*/


import { PaymentModel } from "../model/payment.model";
import { IPayment } from "../model/payment.model";

export const savePayment = async (paymentData: Partial<IPayment>): Promise<IPayment> => {
    const payment = new PaymentModel(paymentData);
    return await payment.save();
};

export const fetchAllPayments = async (): Promise<IPayment[]> => {
    return await PaymentModel.find().sort({ createdAt: -1 }).exec();
};
