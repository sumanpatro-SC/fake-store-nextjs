import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "./AddToCartButton";

export type Product = {
  id: number;
  title: string | null;
  price: number | null;
  category: string | null;
  description: string | null;
  image: string | null;
  rating: {
    rate: number | null;
    count: number | null;
  };
};

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 dark:border-gray-700 dark:bg-gray-900 hover:-translate-y-2 animate-[slide-up_0.6s_ease-out]">
      <Link href={`/products/${product.id}`} className="relative h-48 w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden group">
        <Image
          src={product.image || '/next.svg'}
          alt={product.title || 'Product image'}
          fill
          className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-col gap-1">
          <Link href={`/products/${product.id}`}>
            <h3 className="text-sm font-semibold text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 line-clamp-2 transition duration-200">
              {product.title || 'Unknown Product'}
            </h3>
          </Link>
          <p className="text-xs font-medium text-gray-700 dark:text-gray-400 uppercase tracking-wide">{product.category || 'Uncategorized'}</p>
        </div>

        <p className="flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400 line-clamp-2">
          {product.description || 'No description available'}
        </p>

        <div className="flex items-center justify-between gap-2 pt-2">
          <div>
            <span className="text-lg font-bold text-black dark:text-white">
              ${(product.price || 0).toFixed(2)}
            </span>
            <div className="flex items-center gap-1 text-xs">
              <span className="text-yellow-500">⭐</span>
              <span className="text-gray-600 dark:text-gray-400">
                {(product.rating.rate || 0).toFixed(1)} ({product.rating.count || 0})
              </span>
            </div>
          </div>
        </div>

        <AddToCartButton
          productId={product.id}
          className="w-full h-10 rounded-lg bg-black dark:bg-white text-white dark:text-black text-sm font-semibold hover:shadow-lg hover:shadow-black/30 dark:hover:shadow-white/30 transition-all duration-200 active:scale-95 disabled:opacity-50 transform hover:scale-105"
        />
      </div>
    </article>
  );
}
