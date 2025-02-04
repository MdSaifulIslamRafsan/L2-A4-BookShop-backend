import { NextFunction, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NotFoundPage : RequestHandler = (req , res , next : NextFunction) => {
    res.status(StatusCodes.NOT_FOUND).send({
        success: false,
        message: 'Page not found',
        error : ''
    })
}

export default NotFoundPage;