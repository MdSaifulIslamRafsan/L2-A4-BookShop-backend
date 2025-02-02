import { ProductType } from "./products.interface";
import { ProductModel } from "./products.model";

// Function to create a new product from database
const createProductFromDB = async (product: ProductType) => {
  const result = await ProductModel.create(product);
  return result;
};

// Function to get all products from database
const getAllProductFromDB = async () => {
  const result = await ProductModel.find({});
  return result;
};

// Function to get a single product from database by its id
const getSingleProductFromDB = async (productId: string) => {
  const result = await ProductModel.findById(productId);
  return result;
};

// Function to update a product in database by its id
const updateProductFromDB = async (
  productID: string,
  productInfo: ProductType
) => {
  const result = await ProductModel.findByIdAndUpdate(productID, productInfo, {
    new: true,
  });
  return result;
};

// Function to delete a product from database by its id
const deletedProductFromDB = async (productId: string) => {
  const result = await ProductModel.updateOne(
    { _id: productId },
    { isDeleted: true }
  );
  return result;
};

export const productServices = {
  createProductFromDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateProductFromDB,
  deletedProductFromDB,
};
