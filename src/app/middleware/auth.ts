import { StatusCodes } from 'http-status-codes';
import catchAsync from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import config from '../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../modules/user/user.model';
import AppError from '../errors/AppError';
import { TUserRoles } from "../modules/user/user.interface"

const auth = (...RequiredRoles: TUserRoles[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid authorization');
    }
  
    const decoded = jwt.verify(
      token,
      config.access_token as string,
    ) as JwtPayload;

    const { role, email } = decoded;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new AppError(StatusCodes.FORBIDDEN, 'User not found');
    }

    if (!user) {
        throw new AppError(StatusCodes.NOT_FOUND, "User not found");
      }
      if(!user.isActive){
        throw new AppError(StatusCodes.FORBIDDEN, "User is not active");
      }

    if (RequiredRoles && !RequiredRoles.includes(role)) {
      throw new AppError(
        StatusCodes.FORBIDDEN,
        'You are not authorized to access this resource',
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;