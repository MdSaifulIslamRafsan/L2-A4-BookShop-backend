
import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import { UserRole } from '../user/user.constant';
import auth from '../../middleware/auth';

const router = express.Router();

router.post('/login', validateRequest(AuthValidation.loginUserValidation) ,   AuthController.loginUser );

router.post(
    '/refresh-token',
    validateRequest(AuthValidation.refreshTokenValidation),
    AuthController.refreshToken,
  );
  router.post(
    '/change-password',
    auth(UserRole.user),
    validateRequest(AuthValidation.changePasswordValidation),
    AuthController.changePassword,
  );
  

export const AuthRouter =  router;