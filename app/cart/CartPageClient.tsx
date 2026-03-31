'use client';

import { useOptimistic, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { updateCartItem, removeFromCart } from '../../lib/actions';

type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

type CartData = Record<string, number>;

export default function CartPageClient({ initialCart }: { initialCart: CartData }) {
  const [optimisticCart, addOptimistic] = useOptimistic(
    initialCart,
    (state, { productId, quantity }: { productId: number; quantity: number }) => ({
      ...state,
      [productId]: quantity,
    })
  );

  const [isPending, startTransition] = useTransition();

  const cartItems: CartItem[] = Object.entries(optimisticCart).map(([productId, quantity]) => ({
    id: parseInt(productId),
    title: `Product ${productId}`, // In real app, fetch from DB
    price: 19.99, // In real app, fetch from DB
    image: '/next.svg', // In real app, fetch from DB
    quantity,
  }));

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    startTransition(async () => {
      addOptimistic({ productId, quantity });
      if (quantity <= 0) {
        await removeFromCart(productId);
      } else {
        await updateCartItem(productId, quantity);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-950 py-12">
      <main className="mx-auto w-full max-w-5xl px-4">
        <header className="mb-12 animate-[slide-up_0.6s_ease-out]">
          <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white mb-2">
            Shopping Cart
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
          </p>
        </header>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 animate-[fade-in_0.6s_ease-out]">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">Your cart is empty</p>
            <Link
              href="/products"
              className="inline-flex h-12 items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black px-8 font-semibold hover:shadow-lg hover:shadow-black/30 dark:hover:shadow-white/30 transition-all transform hover:scale-105"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900 hover:shadow-md hover:border-black dark:hover:border-white transition duration-300 animate-[slide-up_0.6s_ease-out]">
                  <div className="relative h-24 w-24 flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl overflow-hidden hover:scale-110 transition-transform duration-300">
                    <Image
                      src="/next.svg"
                      alt={item.title}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-black dark:text-white truncate">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-black dark:text-white">
                      Subtotal: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 rounded-xl p-1 bg-gray-50 dark:bg-gray-800 hover:border-black dark:hover:border-white transition">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={isPending}
                      className="h-8 w-8 rounded flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 font-semibold text-black dark:text-white transition duration-200"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-semibold text-black dark:text-white">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      disabled={isPending}
                      className="h-8 w-8 rounded flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 font-semibold text-black dark:text-white transition duration-200"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1 animate-[slide-up_0.7s_ease-out]">
              <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-900 hover:border-black dark:hover:border-white transition-colors duration-300">
                <h2 className="text-xl font-bold text-black dark:text-white mb-6">
                  Order Summary
                </h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="font-semibold text-black dark:text-white">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tax (8%)</span>
                    <span className="font-semibold text-black dark:text-white">${(total * 0.08).toFixed(2)}</span>
                  </div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-black dark:text-white">Total</span>
                    <span className="text-lg font-bold text-black dark:text-white">${(total * 1.08).toFixed(2)}</span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="w-full h-12 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold hover:shadow-lg hover:shadow-black/30 dark:hover:shadow-white/30 transition-all duration-200 flex items-center justify-center active:scale-95 transform hover:scale-105"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  href="/products"
                  className="w-full h-12 rounded-full border border-gray-300 dark:border-gray-600 text-black dark:text-white font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition mt-3 flex items-center justify-center hover:border-black dark:hover:border-white"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}