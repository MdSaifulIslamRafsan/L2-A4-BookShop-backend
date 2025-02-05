import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import config from "../../config";

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


export const AuthController = {
    loginUser,
};