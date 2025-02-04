
import express from 'express';
import createUser from './usercontroller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
const router = express.Router();

router.post('/register', validateRequest(UserValidation.createUserValidation), createUser)


export const RegisterRouter = router;