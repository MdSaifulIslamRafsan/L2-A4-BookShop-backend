import { z } from "zod";

 const createProductValidation = z.object({
 body : z.object({
    title: z.string().min(1, "Product title is required").trim(),
    image: z.string().min(1, "Product image is required").trim(),
    author: z.string().min(1, "Product author is required").trim(),
    price: z
      .number({
        required_error: "Product price is required",
        invalid_type_error: "Product price must be a number",
      })
      .min(0, "Product price must be greater than or equal to 0"),
    category: z.enum([
      "Fiction",
      "Science",
      "SelfDevelopment",
      "Poetry",
      "Religious",
    ], {
      errorMap: () => ({
        message:
          "Product category must be one of the following: Fiction, Science, SelfDevelopment, Poetry, Religious",
      }),
    }),
    description: z
      .string()
      .min(1, "Product description is required")
      .max(250, "Description cannot exceed 250 characters"),
    quantity: z
      .number()
      .min(1, "Product quantity must be greater than 0")
      .default(0),
    inStock: z.boolean().default(true),
    isDeleted: z.boolean().default(false),
 })
});

export const ProductValidation = {
    createProductValidation
}