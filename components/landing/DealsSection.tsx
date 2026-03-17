'use client';

import Link from 'next/link';
import { ArrowRight, Tag } from 'lucide-react';
import { productService } from '../../lib/services/productService';
import ProductCard from '../shop/ProductCard';

export default function DealsSection() {
  const saleProducts = productService.getAllProducts().filter((p) => p.originalPrice && p.inStock).slice(0, 4);

  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <p className="text-red-600 text-xs sm:text-sm font-bold uppercase tracking-widest">Limited Time</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">Today&apos;s Deals</h2>
            </div>
          </div>
          <Link href="/shop" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-black transition-colors border border-gray-200 hover:border-gray-400 px-4 py-2 rounded-xl">
            See All Deals <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {saleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
