import { Request, Response } from "express";
import { productServices } from "./products.service";

// Create a new product
const createProduct = async (req: Request, res: Response) => {
  try {
    // Extract product data from the request body
    const productInfo = req.body;

    // Save the product data to the database
    const result = await productServices.createProductFromDB(productInfo);

    res.status(200).send({
      success: true,
      message: "Book created successfully",
      data: result,
    });
  } catch (error: unknown) {
    res.status(500).send({
      success: false,
      message: "An error occurred while creating the product",
      error,
    });
  }
};

// Get all products
const getAllProduct = async (req: Request, res: Response) => {
  try {
    // Fetch all products from the database
    const result = await productServices.getAllProductFromDB();

    res.status(200).send({
      success: true,
      message: "Books retrieved successfully",
      data: result,
    });
  } catch (error: unknown) {
    res.status(500).send({
      success: false,
      message: "An error occurred while fetching products",
      error,
    });
  }
};

// Get a single product by ID
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    // Extract product ID from the request parameters
    const { productId } = req.params;

    // Fetch the product from the database based on the provided ID
    const result = await productServices.getSingleProductFromDB(productId);

    res.status(200).send({
      success: true,
      message: "Book retrieved successfully",
      data: result,
    });
  } catch (error: unknown) {
    res.status(500).send({
      success: false,
      message: "An error occurred while fetching single product",
      error,
    });
  }
};

// Update a product by ID
const updateProduct = async (req: Request, res: Response) => {
  try {
    // Extract product ID from the request parameters
    const { productId } = req.params;
    // Extract product data from the request body
    const productInfo = req.body;
    // Update the product in the database based on the provided ID and data
    const result = await productServices.updateProductFromDB(
      productId,
      productInfo
    );

    res.status(200).send({
      success: true,
      message: "Book updated successfully",
      data: result,
    });
  } catch (error: unknown) {
    res.status(500).send({
      success: false,
      message: "An error occurred while updating the product",
      error,
    });
  }
};

// Delete a product by ID
const deleteProduct = async (req: Request, res: Response) => {
  try {
    // Extract product ID from the request parameters
    const { productId } = req.params;

    const result = await productServices.deletedProductFromDB(productId);

    res.status(200).send({
      success: true,
      message: "Book deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "An error occurred while deleting the product",
      error,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
