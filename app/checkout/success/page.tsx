import Link from 'next/link';

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-zinc-50 py-12 dark:bg-black">
      <main className="mx-auto w-full max-w-2xl px-4">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
            Payment Successful!
          </h1>

          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
            Thank you for your purchase. Your order has been confirmed and you'll receive an email confirmation shortly.
          </p>

          <div className="flex gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Continue Shopping
            </Link>
            <Link
              href="/orders"
              className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-300 bg-white px-6 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800"
            >
              View Orders
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}