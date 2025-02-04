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
})

export default createUser;