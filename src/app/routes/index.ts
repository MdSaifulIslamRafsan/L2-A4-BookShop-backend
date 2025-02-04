import { productsRouter } from "../modules/products/Products.router";
import { orderRouter } from "../modules/orders/order.router";
import express from "express";
import { RegisterRouter } from "../modules/user/user.router";

const router = express.Router();
const modulesRoute = [
  {
    name: productsRouter,
    route: "/products",
  },
  {
    name: orderRouter,
    route: "/orders",
  },
  {
    name: RegisterRouter,
    route: "/auth",
  },
];

modulesRoute.forEach((path) => {
  router.use(path.route, path.name);
});

export default router;
