import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { IErrorSources, IGenericErrorResponse } from '../interface/error';

const handleCastError = (
  err: mongoose.Error.CastError,
): IGenericErrorResponse => {
  const statusCode = StatusCodes.BAD_REQUEST;
  const errorSources: IErrorSources[] = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  return {
    statusCode,
    message: 'Invalid data type or format encountered.',
    errorSources,
  };
};

export default handleCastError;
