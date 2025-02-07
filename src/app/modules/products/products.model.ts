import { model, Schema } from "mongoose";
import { ProductType } from "./products.interface";

// create product schema
const ProductSchema = new Schema<ProductType>(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Product image is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Product author is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "product price is required"],
      min: [0, "Product price must be greater than or equal to 0"],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      enum: {
        values: [
          "Fiction",
          "Science",
          "SelfDevelopment",
          "Poetry",
          "Religious",
        ],
        message:
          "{VALUE} is not supported. Product category must be one of the following: Fiction, Science, SelfDevelopment, Poetry, Religious",
      },
    },
    description: {
      type: String,
      maxlength: [250, "Description cannot exceed 250 characters"],
      required: [true, "Product description is required"],
    },
    quantity: {
      type: Number,
      min: [1, "Product quantity must be greater than 0"],
      default: 0,
    },
    inStock: {
      type: Boolean,
      required: [true, "Product in stock status is required"],
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

// remove deleted products before finding them
ProductSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

ProductSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
ProductSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// create product model
export const ProductModel = model<ProductType>("Products", ProductSchema);
