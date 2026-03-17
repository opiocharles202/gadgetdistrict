'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Star,
  ShoppingCart,
  Check,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  Package,
  Minus,
  Plus,
  Heart,
  Share2,
} from 'lucide-react';
import { Product } from '../../../lib/types';
import { productService } from '../../../lib/services/productService';
import { useCartContext } from '../../../context/CartContext';
import ProductCard from '../../../components/shop/ProductCard';

const CATEGORY_LABELS: Record<string, string> = {
  mobile: 'Mobile Phones',
  laptop: 'Laptops',
  accessories: 'Accessories',
};

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [resolvedId, setResolvedId] = useState<string>('');
  const { addToCart, isInCart, cart } = useCartContext();

  useEffect(() => {
    params.then(({ id }) => {
      setResolvedId(id);
      const found = productService.getProductById(id);
      if (found) {
        setProduct(found);
        const related = productService
          .getProductsByCategory(found.category)
          .filter((p) => p.id !== id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
    });
  }, [params]);

  if (!product) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12 animate-pulse">
            <div className="bg-gray-100 rounded-2xl aspect-square" />
            <div className="space-y-4">
              <div className="h-6 bg-gray-100 rounded w-1/3" />
              <div className="h-8 bg-gray-100 rounded w-3/4" />
              <div className="h-6 bg-gray-100 rounded w-1/2" />
              <div className="h-12 bg-gray-100 rounded w-1/3" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  const alreadyInCart = isInCart(product.id);
  const cartItem = cart.items.find((i) => i.product.id === product.id);
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    if (!alreadyInCart) addToCart(product, selectedQuantity);
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="bg-gray-50 border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-gray-500 flex-wrap">
            <Link href="/" className="hover:text-black hover:underline">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <Link href="/shop" className="hover:text-black hover:underline">Shop</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <Link href={`/shop?category=${product.category}`} className="hover:text-black hover:underline">
              {CATEGORY_LABELS[product.category]}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <span className="text-gray-900 font-medium line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-[1fr_380px] gap-10 mb-16">
          <div className="grid md:grid-cols-[auto_1fr] gap-6">
            <div className="hidden md:flex flex-col gap-2">
              {[product.image, product.image, product.image].map((src, i) => (
                <button key={i} className={`w-16 h-16 rounded-xl overflow-hidden border-2 ${i === 0 ? 'border-black' : 'border-gray-200 hover:border-gray-400'} transition-colors`}>
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div className="relative bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 aspect-square max-w-lg w-full mx-auto">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                unoptimized
              />
              {product.badge && (
                <span className={`absolute top-4 left-4 px-3 py-1 rounded-lg text-sm font-bold ${
                  product.badge === 'Sale' ? 'bg-red-500 text-white' :
                  product.badge === 'Hot' ? 'bg-orange-500 text-white' :
                  product.badge === 'New' ? 'bg-blue-600 text-white' :
                  'bg-amber-400 text-black'
                }`}>
                  {product.badge}
                </span>
              )}
              <button className="absolute top-4 right-4 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="pb-4 border-b border-gray-100 mb-4">
              <p className="text-sm font-semibold text-orange-500 uppercase tracking-wide mb-1">{product.brand}</p>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight mb-3">{product.name}</h1>

              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`} />
                  ))}
                  <span className="ml-1 text-sm font-semibold text-gray-700">{product.rating}</span>
                </div>
                <span className="text-sm text-blue-600 hover:underline cursor-pointer">{product.reviewCount.toLocaleString()} ratings</span>
                <span className="hidden sm:inline text-gray-300">|</span>
                <span className="hidden sm:inline text-sm text-green-600 font-semibold">
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            <div className="pb-4 border-b border-gray-100 mb-4">
              <div className="flex items-baseline gap-3 flex-wrap mb-1">
                <span className="text-4xl font-black text-gray-900">${product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">${product.originalPrice.toLocaleString()}</span>
                )}
                {discountPercentage && (
                  <span className="bg-red-100 text-red-600 text-sm font-bold px-2 py-1 rounded-lg">
                    -{discountPercentage}%
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-sm text-red-500 font-semibold">
                  You save ${(product.originalPrice - product.price).toLocaleString()}!
                </p>
              )}
              <p className="text-xs text-gray-400 mt-1">All prices include applicable taxes</p>
            </div>

            <div className="pb-4 border-b border-gray-100 mb-4">
              <p className="text-gray-600 leading-relaxed text-sm">{product.description}</p>
            </div>

            <div className="pb-4 border-b border-gray-100 mb-5">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Key Specifications</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <p className="text-xs text-gray-400 mb-0.5">{key}</p>
                    <p className="text-sm font-semibold text-gray-900 leading-tight">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-semibold text-gray-700">Qty:</span>
              <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                <button
                  onClick={() => setSelectedQuantity((q) => Math.max(1, q - 1))}
                  disabled={selectedQuantity <= 1}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-40 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-gray-900 font-bold text-sm">{selectedQuantity}</span>
                <button
                  onClick={() => setSelectedQuantity((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {alreadyInCart && cartItem && (
                <span className="text-xs text-gray-500">{cartItem.quantity} already in cart</span>
              )}
            </div>

            <div className="flex gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock || alreadyInCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-all ${
                  alreadyInCart
                    ? 'bg-green-50 text-green-700 border-2 border-green-200 cursor-default'
                    : product.inStock
                    ? 'bg-black hover:bg-gray-800 text-white shadow-md hover:shadow-xl active:scale-95'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {alreadyInCart ? (
                  <><Check className="w-4 h-4" /> Added to Cart</>
                ) : (
                  <><ShoppingCart className="w-4 h-4" /> Add to Cart</>
                )}
              </button>

              {alreadyInCart && (
                <Link
                  href="/cart"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm rounded-2xl transition-all shadow-md hover:shadow-xl active:scale-95"
                >
                  Go to Cart <ChevronRight className="w-4 h-4" />
                </Link>
              )}

              <button className="w-12 h-12 border border-gray-300 rounded-2xl flex items-center justify-center text-gray-500 hover:text-black hover:border-black transition-all flex-shrink-0">
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-4 space-y-3">
              {[
                { icon: Truck, text: 'Free delivery on orders over $500', sub: 'Standard: $15' },
                { icon: RotateCcw, text: '30-day hassle-free returns', sub: 'Free return shipping' },
                { icon: ShieldCheck, text: '2-year manufacturer warranty', sub: 'Genuine product guaranteed' },
              ].map(({ icon: Icon, text, sub }) => (
                <div key={text} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-gray-700" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{text}</p>
                    <p className="text-xs text-gray-500">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-gray-900">
                More in <span className="text-orange-500">{CATEGORY_LABELS[product.category]}</span>
              </h2>
              <Link href={`/shop?category=${product.category}`} className="text-sm font-semibold text-blue-600 hover:underline flex items-center gap-1">
                See all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
