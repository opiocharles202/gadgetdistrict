'use client';

import Link from 'next/link';
import { ShoppingCart, Zap, Menu, X, Search } from 'lucide-react';
import { useState } from 'react';
import { useCartContext } from '../../context/CartContext';

export default function Navbar() {
  const { totals } = useCartContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'All Products' },
    { href: '/shop?category=mobile', label: 'Mobiles' },
    { href: '/shop?category=laptop', label: 'Laptops' },
    { href: '/shop?category=accessories', label: 'Accessories' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center group-hover:bg-gray-800 transition-colors">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              The Gadget<span className="text-gray-500"> District</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-all font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/shop" className="hidden sm:flex items-center gap-2 px-3 py-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-all">
              <Search className="w-5 h-5" />
            </Link>

            <Link href="/cart" className="relative flex items-center gap-2 px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg transition-colors font-medium text-sm">
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {totals.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-white text-black text-xs rounded-full flex items-center justify-center font-bold border border-black">
                  {totals.itemCount > 99 ? '99+' : totals.itemCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 text-gray-700 hover:text-black hover:bg-gray-100 rounded-lg transition-all mb-1 font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
