import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";


const createUser = catchAsync(async(req , res) => {

    const result = await UserService.createUserIntoDB(req.body)
    

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: 'User registered successfully',
        data: result,
      })
});
const getUsers = catchAsync(async(req, res) =>{
  
const result = await UserService.getUsersFromDB();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Users Retrieved successfully",
    data: result,
  })
})
const getUser = catchAsync(async(req , res)=> {
  const { email } = req.params;
  const result = await UserService.getUserFromDB(email);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User retrieved successfully",
    data: result,
  })
})

const updateUserRole = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  const result = await UserService.updateUserRoleFromDB(id, role);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User role updated successfully",
    data: result,
  });
});
const updateUserStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;
  const result = await UserService.updateUserStatusFromDB(id, isActive);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User status updated successfully",
    data: result,
  });
});


export const userController = {
  createUser,
  getUsers,
  updateUserRole,
  updateUserStatus,
  getUser

};