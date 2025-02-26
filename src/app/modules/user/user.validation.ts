import { z } from "zod";


const createUserValidation  = z.object({
    body:  z.object({
        name: z
        .string({
          required_error: 'Name is required',
        })
        .min(1, 'Name cannot be empty'),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email('Invalid email address'),
      password: z
        .string({
          required_error: 'Password is required',
        })
        .min(6, 'Password must be at least 6 characters long')
        .max(20, 'Password must not exceed 20 characters'),
      role: z.enum(['admin', 'user']).optional(),
      isActive: z.boolean().optional(),
    })
})



const updateUserRoleValidation = z.object({
  body: z.object({
    role: z.enum(["admin", "user"], {
      required_error: "Role is required",
    }),
  }),
});

const updateUserStatusValidation = z.object({
  body: z.object({
    isActive: z.boolean({
      required_error: "Status is required",
    }),
  }),
});





export const UserValidation  = {
    createUserValidation,
    updateUserRoleValidation,
    updateUserStatusValidation,
}