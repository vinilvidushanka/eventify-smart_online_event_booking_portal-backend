import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITicketDetails {
    id: number;
    title: string;
    venue: string;
    date: string;
    time: string;
    price: number;
    currency: string;
    image: string;
}

export interface ITicketItem {
    tickets: ITicketDetails;
    ticketsCount: number;
}

export interface IPayment extends Document {
    totalAmount: string;
    tickets: ITicketItem[];
    paidBy: string;
    createdAt: Date;
    updatedAt: Date;
}

const TicketDetailsSchema: Schema<ITicketDetails> = new Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    venue: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true },
    image: { type: String, required: true },
});

const TicketItemSchema: Schema<ITicketItem> = new Schema({
    tickets: { type: TicketDetailsSchema, required: true },
    ticketsCount: { type: Number, required: true },
});

const PaymentSchema: Schema<IPayment> = new Schema(
    {
        totalAmount: { type: String, required: true },
        paidBy: { type: String, required: true },
        tickets: { type: [TicketItemSchema], required: true },
    },
    {
        timestamps: true,
    }
);

export const PaymentModel: Model<IPayment> = mongoose.model<IPayment>(
    "Payment",
    PaymentSchema
);
