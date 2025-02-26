import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import User from "../user/user.model";
import {TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import { createJwtToken, verifyToken } from "./auth.utils";
import config from "../../config";

const loginUserFromDB = async (payload: TLoginUser) => {
  const { email, password } = payload;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }
  if(!user.isActive){
    throw new AppError(StatusCodes.FORBIDDEN, "User is not active");
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  ;
  if (!isValidPassword) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid credentials");
  }
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };
  const accessToken = createJwtToken(
    jwtPayload,
    config.access_token as string,
    config.access_expires_in as number,
  );

  const refreshToken = createJwtToken(
    jwtPayload,
    config.refresh_token as string,
    config.refresh_expires_in as number,
  );
  return {
    accessToken,
    refreshToken,
  };
  
};
const refreshTokenFromCookie = async (refreshToken: string) => {
  const decoded = verifyToken(refreshToken, config.refresh_token as string);

  const { email, iat } = decoded;
  const user = await User.findOne({email});
  if (!user) {
    throw new AppError(StatusCodes.FORBIDDEN, 'User not found');
  }
  if (!user.isActive) {
    throw new AppError(StatusCodes.FORBIDDEN, 'User is blocked');
  }
  const passwordChangedTime = new Date(user?.passwordChangeAt).getTime() / 1000;

  if (passwordChangedTime > iat!) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'user token not valid');
  }
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createJwtToken(
    jwtPayload,
    config.access_token as string,
    config.access_expires_in as number,
  );
  return {
    accessToken,
  };
};
const changePasswordIntoDB = async (
  user: { email: string; role: string }, 
  payload:  { oldPassword: string; newPassword: string },
) => {
  const { email } = user;
  const userData = await User.findOne({email}).select("+password"); 

  if (!userData) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  if (!userData.isActive) {
    throw new AppError(StatusCodes.FORBIDDEN, 'User is blocked');
  }
  const isValidPassword = await bcrypt.compare(payload.oldPassword, userData.password);
  if (!isValidPassword) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Invalid password');
  }

  const newPasswordHash = await bcrypt.hash(payload.newPassword, 10);

  await User.findByIdAndUpdate(
    userData?._id,
    {
      password: newPasswordHash,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    },
    { new: true },
  );
  return null;
};

export const AuthService = {
  loginUserFromDB,
  refreshTokenFromCookie,
  changePasswordIntoDB,
};
