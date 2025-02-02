import mongoose, { Schema } from "mongoose";
import { OrderType } from "./order.interface";


// Define the schema for the Order model
const orderSchema = new Schema({
    email :{
        type: String,
        required: [true, "email is required"]
    }, 
    product : {
        type: Schema.Types.ObjectId,
        ref: "Products",
        required: [true, "product is required"]
    },
    quantity : {
        type: Number,
        required: [true, "quantity is required"]
    },
    totalPrice : {
        type: Number,
        required: [true, "totalPrice is required"]
    },
    totalRevenue : {
        type: Number,
    }
},
{
    timestamps: true,
}

)

// Create and export the Order model
export const OrderModel = mongoose.model<OrderType>('Orders', orderSchema);