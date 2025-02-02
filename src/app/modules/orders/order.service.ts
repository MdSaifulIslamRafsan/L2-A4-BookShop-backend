import { OrderType } from "./order.interface"
import { OrderModel } from "./order.model"

// create a new order in the database
const orderCreateFormDB = async(order : OrderType) => {
    const result = await OrderModel.create(order)
    return result;
}

// Calculate the total revenue from the database
const calculateTotalRevenueFromDB = async() => {
      // Use MongoDB's aggregation pipeline to calculate total revenue
    const result = await OrderModel.aggregate([
        {
            $group : {
                _id: null,
                totalRevenue: {$sum : {
                    $multiply: ["$totalPrice", "$quantity"]
                } }
            }
        }
    ])
    return result[0].totalRevenue;
}

// Export the service methods for use in other modules

export const orderService = {
    orderCreateFormDB,
    calculateTotalRevenueFromDB
}