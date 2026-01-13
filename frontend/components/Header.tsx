/**
 * Header Component - Top navigation bar
 * 
 * Features:
 * - Logo/branding
 * - Navigation links
 * - Clean, minimalist design
 */

import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
            E-Shop
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link 
              href="/products" 
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              Products
            </Link>
            <Link 
              href="/cart" 
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
            >
              Cart
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
