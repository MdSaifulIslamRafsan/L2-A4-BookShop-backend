import mongoose, { Schema } from "mongoose";
import { OrderType } from "./order.interface";


// Define the schema for the Order model
const orderSchema = new Schema({
    email :{
        type: String,
        required: [true, "email is required"]
    }, 
    products: [
        {
          product: { type: mongoose.Schema.Types.ObjectId, ref: "ProductModel", required: [true, "Product is required"]},
          quantity: {
            type: Number,
            required: [true, "quantity is required"]
          },
        },
      ],
    
    totalPrice : {
        type: Number,
        required: [true, "totalPrice is required"]
    },
    totalRevenue : {
        type: Number,
    },
    status : {
        type : String,
        enum: ["pending", "paid", "shipped", "completed", "canceled"],
        default: "pending"
    },
    address: {
        type: String,
        required: [true, "address is required"]
    },
    phone: {
        type: String,
        required: [true, "phone is required"]
    },
    transaction : {
        id: String,
        transactionStatus: String,
        bank_status: String,
        sp_code: String,
        sp_message: String,
        method: String,
        date_time: String,
    }

},
{
    timestamps: true,
}

)

// Create and export the Order model
export const OrderModel = mongoose.model<OrderType>('Orders', orderSchema);