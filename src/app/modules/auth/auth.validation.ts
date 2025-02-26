import { z } from "zod";

const loginUserValidation = z.object({
    body: z.object({
      email: z.string({
        required_error: 'email is required',
      }),
      password: z.string({
        required_error: 'Password is required',
      }),
    }),
  });
  const refreshTokenValidation = z.object({
    cookies: z.object({
      refreshToken: z.string({
        required_error: 'Refresh Token is required',
      }),
    }),
  });
  const changePasswordValidation = z.object({
    body: z.object({
      oldPassword: z.string({ required_error: 'Old Password is required' }),
      newPassword: z.string({ required_error: 'New Password is required' }),
    }),
  });

  export  const AuthValidation = {
    loginUserValidation,
    refreshTokenValidation,
    changePasswordValidation
  }
