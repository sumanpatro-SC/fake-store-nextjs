import { z } from 'zod';

export const productSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  price: z.number().nullable(),
  category: z.string().nullable(),
  description: z.string().nullable(),
  image: z.string().nullable(),
  rating: z.object({
    rate: z.number().nullable(),
    count: z.number().nullable(),
  }),
});

export const cartItemSchema = z.object({
  productId: z.number(),
  quantity: z.number().min(1),
});

export const checkoutSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  address: z.string().min(1),
});

export type Product = z.infer<typeof productSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type CheckoutData = z.infer<typeof checkoutSchema>;