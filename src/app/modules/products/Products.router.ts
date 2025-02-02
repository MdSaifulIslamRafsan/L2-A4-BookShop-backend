import express from "express";
import { ProductControllers } from "./products.controller";
const router = express.Router();

// Create a product route
router.post("/", ProductControllers.createProduct);

// Get all products route
router.get("/", ProductControllers.getAllProduct);

// Get a single product route
router.get("/:productId", ProductControllers.getSingleProduct);

// Update a product route
router.put("/:productId", ProductControllers.updateProduct);

// Delete a product route
router.delete("/:productId", ProductControllers.deleteProduct);

export const productsRouter = router;
