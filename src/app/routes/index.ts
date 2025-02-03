import { productsRouter } from '../modules/products/Products.router';
import { orderRouter } from '../modules/orders/order.router';
import express from 'express';

const router = express.Router();
const modulesRoute  = [
    {
        name: productsRouter,
        route: "/products",
    },
    {
        name: orderRouter,
        route: "/orders",
    }
]


modulesRoute.forEach(path => {
    router.use(path.route, path.name);
})

export default router;
