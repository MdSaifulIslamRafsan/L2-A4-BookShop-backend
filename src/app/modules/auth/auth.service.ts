import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import User from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import { createJwtToken } from "./auth.utils";
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

export const AuthService = {
  loginUserFromDB,
};
