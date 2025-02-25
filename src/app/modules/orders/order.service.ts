import mongoose from "mongoose";
import { ProductModel } from "../products/products.model";
import { OrderType } from "./order.interface";
import { OrderModel } from "./order.model";
import { orderUtils } from "./order.utils";
type TError = {
  message: string;
};

// create a new order in the database
const orderCreateFormDB = async (order: OrderType, client_ip: string) => {
  
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    let totalPrice = 0;
    const productUpdates = [];

    for (const item of order.products) {
      const product = await ProductModel.findById(item.product).session(session);
      if (!product) {
        throw new Error(`Product with ID ${item.product} not found`);
      }
      if (item.quantity > product.quantity) {
        throw new Error(`Only ${product.quantity} items available for ${product.title}`);
      }

      totalPrice += product.price * item.quantity;
      productUpdates.push({
        updateOne: {
          filter: { _id: item.product },
          update: { $inc: { quantity: -item.quantity } },
        },
      });
    }

    // Update multiple product quantities at once
    await ProductModel.bulkWrite(productUpdates, { session });

    // Save order
    const newOrder = await OrderModel.create([{ ...order, totalPrice }], { session });

    await session.commitTransaction();
    session.endSession();

    // Payment integration
    const shurjopayPayload = {
      amount: totalPrice,
      order_id: newOrder[0]?._id,
      currency: "BDT",
      customer_name: order.name,
      customer_email: order.email,
      customer_phone: order.phone,
      customer_city: "N/A",
      customer_address: order.address,
      client_ip,
    };

    const payment = await orderUtils.makePayment(shurjopayPayload);

    if (payment?.transactionStatus) {
      await OrderModel.updateOne(
        { _id: newOrder[0]._id },
        {
          $set: {
            transaction: {
              id: payment?.sp_order_id,
              transactionStatus: payment?.transactionStatus,
            },
          },
        }
      );
    }

    return payment.checkout_url;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new Error((error as TError).message);
  }
};


const verifyPayment = async (orderId: string) => {
  const verifiedPayment = await orderUtils.verifyPayment(orderId);
  if (verifiedPayment.length) {
    await OrderModel.findOneAndUpdate({
     "transaction.id" : orderId
    },{
      $set: {
       "transaction.bank_status": verifiedPayment[0].bank_status,
        "transaction.sp_code": verifiedPayment[0].sp_code,
        "transaction.sp_message": verifiedPayment[0].sp_message,
        "transaction.transactionStatus": verifiedPayment[0].transaction_status,
        "transaction.method": verifiedPayment[0].method,
        "transaction.date_time": verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == "Success"
            ? "Paid"
            : verifiedPayment[0].bank_status == "Failed"
            ? "Pending"
            : verifiedPayment[0].bank_status == "Cancel"
            ? "Cancelled"
            : "",

      },
    });
  }
  return verifiedPayment;
};
const getOrders = async () => {
  const data = await OrderModel.find();
  return data;
};

const getOrderFromDB = async (orderId : string) => {
  const data = await OrderModel.findById(orderId);

 
  return data;
}

// Calculate the total revenue from the database
const calculateTotalRevenueFromDB = async () => {
  // Use MongoDB's aggregation pipeline to calculate total revenue
  const result = await OrderModel.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: {
            $multiply: ["$totalPrice", "$quantity"],
          },
        },
      },
    },
  ]);
  return result[0].totalRevenue;
};

// Export the service methods for use in other modules

export const orderService = {
  orderCreateFormDB,
  calculateTotalRevenueFromDB,
  verifyPayment,
  getOrders,
  getOrderFromDB
};
