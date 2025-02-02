import { ObjectId } from "mongoose";

// Define the structure of the OrderType interface
export interface OrderType {
    email: string;
    product : ObjectId,
    quantity: number;
    totalPrice : number;
    totalRevenue: number
}