import { Request, Response } from "express";
import { orderService } from "./order.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
type TError = {
  message: string;
};
// This function handles the POST request for creating an order.
const createOrder = async (req: Request, res: Response) => {
  try {
    // Get the order information from the request body
    const orderInfo = req.body;

    // Save the order data to the database
    const result = await orderService.orderCreateFormDB(
      orderInfo,
      req.ip as string
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Order created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: (error as TError).message,
      error,
    });
  }
};

const verifyPayment = catchAsync(async (req, res) => {
 
  const result = await orderService.verifyPayment(
    req.query.order_id as string
  );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Order Verified successfully",
    data: result,
  });
});

const getOrders = catchAsync(async (req, res) => {
  const order = await orderService.getOrders();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Orders retrieved successfully",
    data: order,
  });
});
const getOrder = catchAsync(async (req, res) => {
  const {orderId} = req.params;
  
  const order = await orderService.getOrderFromDB(orderId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Order retrieved successfully",
    data: order,
  });
});

// This function handles the calculation of total revenue
const calculateTotalRevenue = async (req: Request, res: Response) => {
  try {
    // Retrieve the total revenue from the database by calling the service method
    const result = await orderService.calculateTotalRevenueFromDB();
    sendResponse(res ,{
      success: true,
      statusCode: StatusCodes.OK,
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

const getOrdersByEmail = catchAsync(async (req , res)=> {
  const {email} = req.params;
  const orders = await orderService.getOrdersByEmailFromDB(email as string);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Orders retrieved successfully",
    data: orders,
  });
})
const deleteOrder = catchAsync(async(req , res) => {
  const {id} = req.params;
 const result = await orderService.deleteOrderFromDB(id as string);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Order deleted successfully",
    data: result,
  });
})

const updateOrderStatus = catchAsync(async(req, res) => {
  const {id} = req.params;
  const {status} = req.body;
  const result = await orderService.updateOrderStatusFromDB(id as string, status as string);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Order status updated successfully",
    data: result,
  });
})


export const orderController = {
  createOrder,
  calculateTotalRevenue,
  verifyPayment,
  getOrders,
  getOrder,
  getOrdersByEmail,
  deleteOrder,
  updateOrderStatus
};
