import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import { IErrorSources, IGenericErrorResponse } from "../interface/error";

const handleValidationError = (err : mongoose.Error.ValidationError ) : IGenericErrorResponse =>{

    const statusCode = StatusCodes.BAD_REQUEST;
    const errorSources : IErrorSources[] = Object.values(err.errors).map((value : mongoose.Error.ValidatorError | mongoose.Error.CastError ) => {
        return {
            path: value.path,
            message : value.message
        }
    });

    return {
        statusCode,
        message: "Validation error",
        errorSources
    }
}

export default handleValidationError;