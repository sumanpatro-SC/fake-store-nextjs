'use client';

import { addToCart } from "../lib/actions";

export function AddToCartButton({ productId, className }: { productId: number; className?: string }) {
  return (
    <button
      onClick={async () => {
        await addToCart(productId, 1);
      }}
      className={className}
    >
      Add to Cart
    </button>
  );
}