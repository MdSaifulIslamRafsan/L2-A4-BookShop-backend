
import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
import { userController } from './usercontroller';
import auth from '../../middleware/auth';
import { UserRole } from './user.constant';
const router = express.Router();

router.post('/register', validateRequest(UserValidation.createUserValidation), userController.createUser);

router.get('/users', auth(UserRole.admin),  userController.getUsers)
router.get('/user/:email', auth(UserRole.user , UserRole.admin),  userController.getUser)

router.patch(
    '/:id/role',
    auth(UserRole.admin),
    validateRequest(UserValidation.updateUserRoleValidation),
    userController.updateUserRole
  );

  router.patch(
    '/:id/status',
    auth(UserRole.admin),
    validateRequest(UserValidation.updateUserStatusValidation),
    userController.updateUserStatus
  );


export const RegisterRouter = router;