import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { db } from "../../../lib/db";
import { products } from "../../../lib/db/schema";
import { eq } from "drizzle-orm";
import { AddToCartButton } from "../../../components/AddToCartButton";

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

async function getProduct(id: number): Promise<Product | null> {
  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.id, id))
    .limit(1);

  if (!product) return null;

  return {
    id: product.id,
    title: product.title || 'Unknown Product',
    price: product.price || 0,
    category: product.category || 'Uncategorized',
    description: product.description || 'No description available',
    image: product.image || '/next.svg',
    rating: {
      rate: product.rating || 0,
      count: product.ratingCount || 0,
    },
  };
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(parseInt(id));

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.title} · Fake Store`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(parseInt(id));

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-950 py-12">
      <main className="mx-auto w-full max-w-4xl px-4">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-semibold text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 mb-8 transition-all transform hover:translate-x-1 duration-200 animate-[slide-in_0.6s_ease-out]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </Link>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="relative aspect-square w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-3xl overflow-hidden flex items-center justify-center shadow-lg hover:shadow-2xl transition-shadow duration-300 animate-[slide-in_0.6s_ease-out]">
            <Image
              src={product.image || '/next.svg'}
              alt={product.title || 'Product'}
              fill
              className="object-contain p-12 hover:scale-110 transition-transform duration-500"
              priority
            />
          </div>

          <div className="space-y-8 py-6 animate-[slide-up_0.6s_ease-out]">
            <div className="space-y-4">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-400 uppercase tracking-widest">
                {product.category || 'Product'}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white">
                {product.title || 'Unknown Product'}
              </h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(product.rating.rate || 0) ? 'text-yellow-400 text-xl' : 'text-gray-300 dark:text-gray-600 text-xl'}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {(product.rating.rate || 0).toFixed(1)} ({product.rating.count || 0} reviews)
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Price</p>
              <p className="text-5xl font-bold text-black dark:text-white">
                ${(product.price || 0).toFixed(2)}
              </p>
            </div>

            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              {product.description || 'No description available'}
            </p>

            <div className="grid grid-cols-2 gap-4 py-6 border-y border-gray-200 dark:border-gray-800">
              <div className="hover:bg-gray-50 dark:hover:bg-gray-900 p-3 rounded-lg transition-colors">
                <p className="text-sm text-gray-600 dark:text-gray-400">Category</p>
                <p className="font-semibold text-black dark:text-white">{product.category || 'N/A'}</p>
              </div>
              <div className="hover:bg-gray-50 dark:hover:bg-gray-900 p-3 rounded-lg transition-colors">
                <p className="text-sm text-gray-600 dark:text-gray-400">In Stock</p>
                <p className="font-semibold text-green-600 dark:text-green-400">Available</p>
              </div>
            </div>

            <AddToCartButton
              productId={product.id}
              className="w-full h-14 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-lg hover:shadow-2xl hover:shadow-black/30 dark:hover:shadow-white/30 transition-all duration-200 active:scale-95 transform hover:scale-105"
            />
          </div>
        </div>
      </main>
    </div>
  );
}