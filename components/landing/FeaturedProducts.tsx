'use client';

import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { productService } from '../../lib/services/productService';
import ProductCard from '../shop/ProductCard';

export default function FeaturedProducts() {
  const featuredProducts = productService.getFeaturedProducts(8);

  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <div>
            <p className="text-gray-500 text-xs sm:text-sm font-bold uppercase tracking-widest mb-1 sm:mb-2">Hand-picked for you</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">Featured Products</h2>
          </div>
          <Link href="/shop" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-black transition-colors border border-gray-200 hover:border-gray-400 px-4 py-2 rounded-xl group">
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-bold text-white bg-black hover:bg-gray-800 px-6 py-3 rounded-xl transition-all">
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
