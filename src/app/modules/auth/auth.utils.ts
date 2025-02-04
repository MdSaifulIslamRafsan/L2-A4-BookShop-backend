import jwt, { JwtPayload } from "jsonwebtoken";

export const createJwtToken = (
  payload: { role: string; email: string },
  secreteToken: string,
  expiresIn: number,
) => {
  return jwt.sign(payload, secreteToken, {
    expiresIn, 
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};