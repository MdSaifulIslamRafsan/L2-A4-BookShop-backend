import express from 'express'
import { orderController } from './order.controller';
const router = express.Router();


// create a orders data
router.post('/', orderController.createOrder);

// Route to calculate total revenue
router.get('/revenue', orderController.calculateTotalRevenue)

// Export the router to be used in other parts of the application
export const orderRouter = router;
