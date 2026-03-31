'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';
import { db } from './db';
import { cartItems } from './db/schema';
import { eq, and } from 'drizzle-orm';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export type CartItem = {
  id: string;
  productId: number;
  quantity: number;
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
  };
};

export async function getCartItems(userId?: string): Promise<CartItem[]> {
  if (!userId) return [];

  const items = await db
    .select({
      id: cartItems.id,
      productId: cartItems.productId,
      quantity: cartItems.quantity,
      product: {
        id: cartItems.productId,
        title: cartItems.productId, // We'll need to join with products table
        price: cartItems.productId,
        image: cartItems.productId,
      },
    })
    .from(cartItems)
    .where(eq(cartItems.userId, userId));

  // For now, return empty array since we need proper joins
  return [];
}

export async function addToCart(productId: number, quantity: number = 1) {
  // For demo purposes, we'll use a simple cookie-based cart
  // In a real app, this would be user-specific
  const cookieStore = await cookies();
  const cartCookie = cookieStore.get('cart')?.value;
  const cart = cartCookie ? JSON.parse(cartCookie) : {};

  cart[productId] = (cart[productId] || 0) + quantity;

  cookieStore.set('cart', JSON.stringify(cart), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  revalidatePath('/cart');
}

export async function updateCartItem(productId: number, quantity: number) {
  const cookieStore = await cookies();
  const cartCookie = cookieStore.get('cart')?.value;
  const cart = cartCookie ? JSON.parse(cartCookie) : {};

  if (quantity <= 0) {
    delete cart[productId];
  } else {
    cart[productId] = quantity;
  }

  cookieStore.set('cart', JSON.stringify(cart), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  });

  revalidatePath('/cart');
}

export async function removeFromCart(productId: number) {
  const cookieStore = await cookies();
  const cartCookie = cookieStore.get('cart')?.value;
  const cart = cartCookie ? JSON.parse(cartCookie) : {};

  delete cart[productId];

  cookieStore.set('cart', JSON.stringify(cart), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  });

  revalidatePath('/cart');
}

export async function getCartFromCookies() {
  const cookieStore = await cookies();
  const cartCookie = cookieStore.get('cart')?.value;
  return cartCookie ? JSON.parse(cartCookie) : {};
}

export async function createCheckoutSession() {
  const cart = await getCartFromCookies();

  if (Object.keys(cart).length === 0) {
    throw new Error('Cart is empty');
  }

  // In a real app, fetch product details from database
  const lineItems = Object.entries(cart).map(([productId, quantity]) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: `Product ${productId}`,
        images: ['/next.svg'], // In real app, use actual product image
      },
      unit_amount: 1999, // $19.99 in cents
    },
    quantity: quantity as number,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
  });

  redirect(session.url!);
}