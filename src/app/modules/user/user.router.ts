
import express from 'express';
import createUser from './usercontroller';
const router = express.Router();

router.post('/', createUser)


export const RegisterRouter = router;