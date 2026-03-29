'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Star, Check } from 'lucide-react';
import { Product } from '../../lib/types';
import { useCartContext } from '../../context/CartContext';

const BADGE_STYLES: Record<string, string> = {
  'New': 'bg-black text-white',
  'Sale': 'bg-gray-700 text-white',
  'Hot': 'bg-gray-800 text-white',
  'Best Seller': 'bg-white text-black border border-gray-200',
};

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isInCart } = useCartContext();
  const alreadyInCart = isInCart(product.id);
  const discountPct = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!alreadyInCart && product.inStock) addToCart(product);
  };

  const fullStars = Math.floor(product.rating);

  return (
    <Link
      href={`/product/${product.id}`}
      className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200"
    >
      <div className="relative bg-gray-50 overflow-hidden" style={{ paddingBottom: '100%' }}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-103 transition-transform duration-400"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          unoptimized
        />
        {product.badge && (
          <span className={`absolute top-2 left-2 text-[10px] font-bold px-1.5 py-0.5 rounded ${BADGE_STYLES[product.badge]}`}>
            {product.badge}
          </span>
        )}
        {discountPct && (
          <span className="absolute top-2 right-2 text-[10px] font-bold bg-red-600 text-white px-1.5 py-0.5 rounded">
            -{discountPct}%
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/75 flex items-center justify-center">
            <span className="text-xs font-semibold text-gray-500 bg-white border border-gray-200 px-3 py-1 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-3 gap-1.5">
        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{product.brand}</p>

        <h3 className="text-xs font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-black flex-1">
          {product.name}
        </h3>

        <div className="flex items-center gap-1">
          <div className="flex gap-px">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < fullStars ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`}
              />
            ))}
          </div>
          <span className="text-[10px] text-blue-600">{product.reviewCount.toLocaleString()}</span>
        </div>

        <div className="flex items-baseline gap-1.5 mt-0.5">
          <span className="text-base font-black text-gray-900">${product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">${product.originalPrice.toLocaleString()}</span>
          )}
        </div>

        {product.inStock ? (
          <p className="text-[10px] text-green-600 font-semibold">In stock · Free delivery over $500</p>
        ) : (
          <p className="text-[10px] text-red-500 font-semibold">Currently unavailable</p>
        )}

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock || alreadyInCart}
          className={`mt-1 w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
            alreadyInCart
              ? 'bg-green-50 text-green-700 border border-green-200'
              : product.inStock
              ? 'bg-black hover:bg-gray-800 text-white active:scale-95'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {alreadyInCart ? (
            <><Check className="w-3.5 h-3.5" /> In Cart</>
          ) : (
            <><ShoppingCart className="w-3.5 h-3.5" /> Add to Cart</>
          )}
        </button>
      </div>
    </Link>
  );
}
