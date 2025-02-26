import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import config from "../../config";
import { TUser } from "../user/user.interface";

const loginUser = catchAsync(async(req, res) => {
    const result = await AuthService.loginUserFromDB(req.body);
    const {refreshToken} = result;
    res.cookie('refreshToken', refreshToken, {
        secure: config.NODE_ENV as string === 'production',
        httpOnly: true,
        sameSite: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
      });
    
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Login successful',
        data: result,
      });
})
const refreshToken = catchAsync(async (req , res) => {
  const {refreshToken} = req.cookies;
  const result = await AuthService.refreshTokenFromCookie(refreshToken)
  sendResponse(res , {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Token refreshed successfully',
    data: result,
  })
})
const changePassword = catchAsync(async(req ,res)=>{

  const user = req.user as TUser;
 
  const result = await AuthService.changePasswordIntoDB(user , req.body)
  sendResponse(res , {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Password Updated successfully',
    data : result,
  })
})
export const AuthController = {
    loginUser,
    refreshToken,
    changePassword
};