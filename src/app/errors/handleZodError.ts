import { ZodIssue, ZodError } from "zod";

import { StatusCodes } from "http-status-codes";
import { IErrorSources, IGenericErrorResponse } from "../interface/error";

const handleZodError = (err : ZodError) : IGenericErrorResponse => {
    const statusCode = StatusCodes.BAD_REQUEST;
    const errorSources : IErrorSources[] = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      };
    });

    return {
      statusCode,
      message: 'Validation error',
      errorSources
    };
};

export default handleZodError