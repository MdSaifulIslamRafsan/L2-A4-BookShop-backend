
import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
import { userController } from './usercontroller';
import auth from '../../middleware/auth';
import { UserRole } from './user.constant';
const router = express.Router();

router.post('/register', validateRequest(UserValidation.createUserValidation), userController.createUser);

router.get('/users', auth(UserRole.admin),  userController.getUsers)


export const RegisterRouter = router;