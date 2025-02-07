import { Request, Response } from "express";
import { orderService } from "./order.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

// This function handles the POST request for creating an order.
const createOrder = async (req: Request, res: Response) => {
  try {
    // Get the order information from the request body
    const orderInfo = req.body;

    // Save the order data to the database
    const result = await orderService.orderCreateFormDB(orderInfo);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Order created successfully",
      data: result
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to create order",
      error,
    });
  }
};

// This function handles the calculation of total revenue
const calculateTotalRevenue = async (req: Request, res: Response) => {
  try {
    // Retrieve the total revenue from the database by calling the service method
    const result = await orderService.calculateTotalRevenueFromDB();
    res.send({
      success: true,
      message: "Revenue calculated successfully",
      data: {
        totalRevenue: result,
      },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to calculate total revenue",
      error,
    });
  }
};

// Exporting the controller functions as part of the orderController object

export const orderController = {
  createOrder,
  calculateTotalRevenue,
};
