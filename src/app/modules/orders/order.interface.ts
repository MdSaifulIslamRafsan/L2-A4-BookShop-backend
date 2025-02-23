import { ObjectId } from "mongoose";

// Define the structure of the OrderType interface
export interface OrderType {
    name: string;
    email: string;
    product : ObjectId,
    quantity: number;
    totalPrice : number;
    totalRevenue: number;
    status : "pending" | "paid" | "shipped" | "completed" | "canceled",
    transaction: {
        id: string;
        transactionStatus: string;
        bank_status: string;
        sp_code: string;
        sp_message: string;
        method: string;
        date_time: string;
      };
}