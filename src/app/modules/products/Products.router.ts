import express from "express";
import { ProductControllers } from "./products.controller";
import validateRequest from "../../middleware/validateRequest";
import { ProductValidation } from "./products.validation";
const router = express.Router();

// Create a product route
router.post("/", validateRequest(ProductValidation.createProductValidation)  , ProductControllers.createProduct);

// Get all products route
router.get("/", ProductControllers.getAllProduct);

// Get a single product route
router.get("/:productId", ProductControllers.getSingleProduct);

// Update a product route
router.put("/:productId", ProductControllers.updateProduct);

// Delete a product route
router.delete("/:productId", ProductControllers.deleteProduct);

export const productsRouter = router;
