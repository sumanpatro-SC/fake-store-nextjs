import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ProductCard, type Product } from "../../components/ProductCard";
import { ProductGridSkeleton } from "../../components/ProductSkeleton";
import { db } from "../../lib/db";
import { products } from "../../lib/db/schema";

export const metadata: Metadata = {
  title: "Products · Fake Store",
  description: "Browse products from our store.",
};

async function getProducts(): Promise<Product[]> {
  const data = await db.select().from(products);
  return data.map(product => ({
    id: product.id,
    title: product.title || 'Unknown Product',
    price: product.price,
    category: product.category || 'Uncategorized',
    description: product.description || 'No description available',
    image: product.image || '/next.svg',
    rating: {
      rate: product.rating || 0,
      count: product.ratingCount || 0,
    },
  }));
}

function ProductGrid({ products }: { products: Product[] }) {
  return (
    <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index < 6} />
      ))}
    </section>
  );
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-950 py-12">
      <main className="mx-auto w-full max-w-6xl px-4">
        <header className="mb-12 animate-[slide-up_0.6s_ease-out]">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white mb-2">
              Discover Our Collection
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              Browse through our carefully curated selection of premium quality products at unbeatable prices.
            </p>
          </div>
        </header>

        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGrid products={products} />
        </Suspense>
      </main>
    </div>
  );
}
