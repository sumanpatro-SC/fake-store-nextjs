import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white dark:from-black dark:via-zinc-950 dark:to-black -z-10" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gray-300 dark:bg-gray-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-400 dark:bg-gray-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 animate-pulse" />

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full">
          {/* Left Content */}
          <div className="space-y-8 animate-[slide-up_0.8s_ease-out]">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-black dark:text-white">
                Discover Amazing
                <span className="bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-400 bg-clip-text text-transparent"> Products</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                Shop our curated collection of premium quality products at unbeatable prices. Fast shipping, easy returns, and excellent customer service.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex h-14 items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold hover:shadow-2xl hover:shadow-black/30 dark:hover:shadow-white/30 transition-all transform hover:scale-105 active:scale-95"
              >
                Shop Now
              </Link>
              <a
                href="#features"
                className="inline-flex h-14 items-center justify-center rounded-full border-2 border-black dark:border-white px-8 text-black dark:text-white font-semibold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
              >
                Learn More
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="animate-[slide-up_1s_ease-out]">
                <div className="text-3xl font-bold text-black dark:text-white">1000+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Products</div>
              </div>
              <div className="animate-[slide-up_1.2s_ease-out]">
                <div className="text-3xl font-bold text-black dark:text-white">50K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Happy Customers</div>
              </div>
              <div className="animate-[slide-up_1.4s_ease-out]">
                <div className="text-3xl font-bold text-black dark:text-white">24/7</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Support</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-96 md:h-full md:min-h-screen flex items-center justify-center animate-[slide-in_0.8s_ease-out_0.2s_both]">
            <div className="relative w-full aspect-square max-w-md">
              <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-gray-600/10 rounded-3xl blur-3xl" />
              <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black rounded-3xl p-8 flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-center animate-[float_4s_ease-in-out_infinite]">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-800 to-black dark:from-gray-200 dark:to-white rounded-2xl mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 font-semibold">Premium Quality</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gray-50 dark:bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-[slide-up_0.8s_ease-out]">
            <h2 className="text-4xl font-bold text-black dark:text-white mb-4">Why Choose Us?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Experience shopping like never before</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🚀",
                title: "Fast Shipping",
                description: "Get your products delivered in 2-5 business days, wherever you are.",
              },
              {
                icon: "✨",
                title: "Premium Quality",
                description: "All products are carefully selected and quality-checked before shipping.",
              },
              {
                icon: "💚",
                title: "Easy Returns",
                description: "Not satisfied? Return within 30 days for a full refund, no questions asked.",
              },
              {
                icon: "🔒",
                title: "Secure Checkout",
                description: "Your payment is safe and encrypted with industry-leading security.",
              },
              {
                icon: "💬",
                title: "24/7 Support",
                description: "Have questions? Our customer service team is always here to help.",
              },
              {
                icon: "🎁",
                title: "Great Deals",
                description: "Enjoy exclusive discounts and special offers on your favorite items.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white hover:shadow-2xl transition-all transform hover:-translate-y-2 animate-[slide-up_${0.8 + idx * 0.1}s_ease-out] cursor-pointer group`}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-black dark:text-white mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-300">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-900 dark:to-black rounded-3xl p-12 border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-all duration-300 animate-[slide-up_0.8s_ease-out]">
          <h2 className="text-4xl font-bold text-black dark:text-white">Ready to Shop?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Browse our collection of premium products and find exactly what you need.
          </p>
          <Link
            href="/products"
            className="inline-flex h-14 items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black px-8 font-semibold hover:shadow-2xl hover:shadow-black/30 dark:hover:shadow-white/30 transition-all transform hover:scale-105 active:scale-95"
          >
            Start Shopping
          </Link>
        </div>
      </section>
    </main>
  );
}
