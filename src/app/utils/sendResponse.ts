import { Response } from 'express';

interface TResponse<T> {
  success: boolean;
  statusCode: number;
  message?: string;
  data?: T;
}

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).send({
    success: data?.success,
    statusCode: data?.statusCode,
    message: data?.message,
    data: data?.data,
  });
};

export default sendResponse;