import { getCartFromCookies, createCheckoutSession } from '../../lib/actions';

export default async function CheckoutPage() {
  const cart = await getCartFromCookies();
  const cartItems = Object.entries(cart) as [string, number][];

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 dark:bg-black">
        <main className="mx-auto w-full max-w-2xl px-4">
          <div className="text-center py-12 animate-[fade-in_0.6s_ease-out]">
            <h1 className="text-2xl font-semibold text-black dark:text-white mb-4">
              Your cart is empty
            </h1>
            <a
              href="/products"
              className="inline-flex h-12 items-center justify-center rounded-full bg-black dark:bg-white px-6 text-sm font-medium text-white dark:text-black transition hover:shadow-lg hover:shadow-black/30 dark:hover:shadow-white/30 transform hover:scale-105"
            >
              Continue Shopping
            </a>
          </div>
        </main>
      </div>
    );
  }

  const total = cartItems.length * 19.99; // Simplified calculation

  return (
    <div className="min-h-screen bg-gray-50 py-12 dark:bg-black">
      <main className="mx-auto w-full max-w-4xl px-4">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="animate-[slide-up_0.6s_ease-out]">
            <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-white mb-8">
              Checkout
            </h1>

            <form className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-black dark:text-white mb-4">
                  Shipping Information
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full h-10 px-3 rounded-lg border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900 focus:border-black dark:focus:border-white focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full h-10 px-3 rounded-lg border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900 focus:border-black dark:focus:border-white focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 transition"
                      required
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full h-10 px-3 rounded-lg border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900 focus:border-black dark:focus:border-white focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 transition"
                    required
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    className="w-full h-10 px-3 rounded-lg border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900 focus:border-black dark:focus:border-white focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10 transition"
                    required
                  />
                </div>
              </div>

              <div>
                <h2 className="text-lg font-medium text-black dark:text-white mb-4">
                  Payment Information
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  You'll be redirected to Stripe to complete your payment securely.
                </p>
              </div>
            </form>
          </div>

          <div className="animate-[slide-up_0.7s_ease-out]">
            <div className="sticky top-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 hover:border-black dark:hover:border-white transition-colors duration-300">
              <h2 className="text-lg font-semibold text-black dark:text-white mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-4">
                {cartItems.map(([productId, quantity]) => (
                  <div key={productId} className="flex justify-between text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                    <span>Product {String(productId)} × {quantity}</span>
                    <span>${(19.99 * quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-800 pt-4 space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="text-black dark:text-white">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span className="text-green-600 dark:text-green-400">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Tax</span>
                  <span className="text-black dark:text-white">${(total * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200 dark:border-gray-800">
                  <span className="text-black dark:text-white">Total</span>
                  <span className="text-black dark:text-white">${(total * 1.08).toFixed(2)}</span>
                </div>
              </div>

              <form action={createCheckoutSession}>
                <button
                  type="submit"
                  className="w-full h-12 rounded-full bg-black dark:bg-white text-white dark:text-black font-medium hover:shadow-lg hover:shadow-black/30 dark:hover:shadow-white/30 transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                  Pay with Stripe
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}