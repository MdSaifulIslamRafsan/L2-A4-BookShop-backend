import express from 'express'
import { orderController } from './order.controller';
import { UserRole } from '../user/user.constant';
import auth from '../../middleware/auth';
const router = express.Router();


// create a orders data
router.post('/', orderController.createOrder);

// Route to calculate total revenue
router.get('/revenue', orderController.calculateTotalRevenue)

// Route to get a specific order
router.get('/verify', auth(UserRole.user), orderController.verifyPayment)

// Route to get all orders
router.get('/', orderController.getOrders)
router.get('/:orderId', orderController.getOrder)
router.get('/email/:email', auth(UserRole.user), orderController.getOrdersByEmail);


// Export the router to be used in other parts of the application
export const orderRouter = router;
