'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md dark:bg-black/95 border-b border-gray-200 dark:border-gray-800 animate-[fade-in_0.5s_ease-out]">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-black to-gray-800 dark:from-white dark:to-gray-300 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <span className="text-white dark:text-black font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-lg text-black dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">Store</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full">
              Products
            </Link>
            <Link href="/cart" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full">
              Cart
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors transform hover:scale-110 duration-200"
          >
            <svg className="w-6 h-6 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-800 py-4 space-y-2 animate-[slide-down_0.3s_ease-out]">
            <Link
              href="/products"
              className="block px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
            >
              Products
            </Link>
            <Link
              href="/cart"
              className="block px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
            >
              Cart
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-black border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="animate-[slide-up_0.8s_ease-out]">
            <div className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 bg-gradient-to-br from-black to-gray-800 dark:from-white dark:to-gray-300 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <span className="text-white dark:text-black font-bold text-lg">S</span>
              </div>
              <span className="font-bold text-lg text-black dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">Store</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your favorite place to shop online.
            </p>
          </div>

          {/* Links */}
          <div className="animate-[slide-up_0.9s_ease-out]">
            <h3 className="font-semibold text-black dark:text-white mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="animate-[slide-up_1s_ease-out]">
            <h3 className="font-semibold text-black dark:text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="animate-[slide-up_1.1s_ease-out]">
            <h3 className="font-semibold text-black dark:text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center text-sm text-gray-600 dark:text-gray-400 animate-[fade-in_1.2s_ease-out]">
          <p>&copy; 2026 Fake Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}