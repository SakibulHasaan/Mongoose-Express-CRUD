import { z } from 'zod';

export const OrderValidationSchema = z.object({
  productName: z.string().min(1, 'Product name is required'),
  price: z.number().min(1, { message: 'Price must be greater than 0' }),
  quantity: z.number().int().positive('Quantity must be a positive integer'),
});

// Define the User schema using Zod with required error messages
export const UserValidationSchema = z.object({
  userId: z.number().positive('User ID must be a positive number'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(15, 'Username must be at most 15 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  fullName: z.object({
    firstName: z
      .string()
      .min(1, 'First name is required')
      .max(15, 'First name must be at most 15 characters'),
    lastName: z
      .string()
      .min(1, 'Last name is required')
      .max(15, 'Last name must be at most 15 characters'),
  }),
  age: z.number().min(1, 'Age must be at least 1'),
  email: z.string().email('Invalid email format'),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    country: z.string().min(1, 'Country is required'),
  }),
  orders: z.array(OrderValidationSchema).optional(),
});

export const UserUpdateValidationSchema = z.object({
  userId: z.number().positive('User ID must be a positive number').optional(),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(15, 'Username must be at most 15 characters')
    .optional(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .optional(),
  fullName: z
    .object({
      firstName: z
        .string()
        .min(1, 'First name is required')
        .max(15, 'First name must be at most 15 characters')
        .optional(),
      lastName: z
        .string()
        .min(1, 'Last name is required')
        .max(15, 'Last name must be at most 15 characters')
        .optional(),
    })
    .optional(),
  age: z.number().min(1, 'Age must be at least 1').optional(),
  email: z.string().email('Invalid email format').optional(),
  isActive: z.boolean().default(true).optional(),
  hobbies: z.array(z.string()).optional(),
  address: z
    .object({
      street: z.string().min(1, 'Street is required').optional(),
      city: z.string().min(1, 'City is required').optional(),
      country: z.string().min(1, 'Country is required').optional(),
    })
    .optional(),
  orders: z.array(OrderValidationSchema).optional(),
});
