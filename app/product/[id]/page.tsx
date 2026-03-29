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
  ThumbsUp,
  Verified,
  AlertCircle,
} from 'lucide-react';
import { Product, CustomerReview } from '../../../lib/types';
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
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');
  const [selectedImage, setSelectedImage] = useState(0);
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
      <div className="bg-gray-50 border-b border-gray-200 py-3 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-gray-500 flex-wrap">
            <Link href="/" className="hover:text-black hover:underline">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <Link href="/shop" className="hover:text-black hover:underline">Shop</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <Link href={`/shop?category=${product?.category}`} className="hover:text-black hover:underline">
              {product?.category && CATEGORY_LABELS[product.category]}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <span className="text-gray-900 font-medium line-clamp-1">{product?.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Product Section */}
        <div className="grid lg:grid-cols-[1fr_420px] gap-10 mb-12">
          {/* Image Gallery */}
          <div className="grid md:grid-cols-[100px_1fr] gap-4">
            {/* Thumbnails */}
            <div className="hidden md:flex flex-col gap-2 order-first">
              {(product?.images || [product?.image]).map((src, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    i === selectedImage ? 'border-black shadow-lg' : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden border border-gray-200 aspect-square max-w-lg w-full mx-auto md:mx-0">
              <Image
                src={product?.images?.[selectedImage] || product?.image || ''}
                alt={product?.name || ''}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                unoptimized
              />
              {product?.badge && (
                <span className={`absolute top-4 left-4 px-3 py-1 rounded-lg text-sm font-bold shadow-lg ${
                  product.badge === 'Sale' ? 'bg-black text-white' :
                  product.badge === 'Hot' ? 'bg-gray-800 text-white' :
                  product.badge === 'New' ? 'bg-gray-600 text-white' :
                  'bg-white text-black border border-gray-200'
                }`}>
                  {product.badge}
                </span>
              )}
              <button className="absolute top-4 right-4 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors hover:scale-110">
                <Heart className="w-5 h-5" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                {selectedImage + 1} / {(product?.images || [product?.image]).length}
              </div>
            </div>

            {/* Mobile Thumbnails */}
            <div className="md:hidden flex gap-2 overflow-x-auto pb-2">
              {(product?.images || [product?.image]).map((src, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                    i === selectedImage ? 'border-black' : 'border-gray-200'
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info Sidebar */}
          <div className="flex flex-col">
            {/* Header Section */}
            <div className="pb-4 border-b border-gray-100 mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{product?.brand}</p>
                {product?.inStock && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                    <Check className="w-3 h-3" /> In Stock
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight mb-4">{product?.name}</h1>

              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(product?.rating || 0) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`} />
                    ))}
                  </div>
                  <span className="font-bold text-gray-900">{product?.rating}</span>
                </div>
                <button className="text-sm text-gray-600 hover:underline font-semibold">
                  {product?.reviewCount.toLocaleString()} ratings
                </button>
              </div>
            </div>

            {/* Price Section */}
            <div className="pb-4 border-b border-gray-100 mb-4">
              <div className="mb-2">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-4xl font-black text-gray-900">${product?.price.toLocaleString()}</span>
                  {product?.originalPrice && (
                    <>
                      <span className="text-xl text-gray-400 line-through">${product.originalPrice.toLocaleString()}</span>
                      <span className="bg-red-100 text-red-600 text-sm font-bold px-2.5 py-1 rounded-lg">
                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </span>
                    </>
                  )}
                </div>
                {product?.originalPrice && (
                  <p className="text-sm text-red-600 font-semibold mt-1">
                    You save ${(product.originalPrice - product.price).toLocaleString()}!
                  </p>
                )}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="pb-4 border-b border-gray-100 mb-5">
              <label className="block text-sm font-bold text-gray-900 mb-3">Select Quantity</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden bg-gray-50">
                  <button
                    onClick={() => setSelectedQuantity((q) => Math.max(1, q - 1))}
                    disabled={selectedQuantity <= 1}
                    className="w-11 h-11 flex items-center justify-center text-gray-600 hover:bg-gray-200 disabled:opacity-40 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-gray-900 font-bold">{selectedQuantity}</span>
                  <button
                    onClick={() => setSelectedQuantity((q) => q + 1)}
                    className="w-11 h-11 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={!product?.inStock || alreadyInCart}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm transition-all ${
                  alreadyInCart
                    ? 'bg-green-50 text-green-700 border-2 border-green-200 cursor-default'
                    : product?.inStock
                    ? 'bg-black hover:bg-gray-800 text-white shadow-lg hover:shadow-xl active:scale-95'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {alreadyInCart ? (
                  <><Check className="w-5 h-5" /> Added to Cart</>
                ) : (
                  <><ShoppingCart className="w-5 h-5" /> Add to Cart</>
                )}
              </button>

              <button className="w-12 h-12 border-2 border-gray-300 rounded-xl flex items-center justify-center text-gray-500 hover:text-black hover:border-black transition-all">
                <Heart className="w-5 h-5" />
              </button>

              <button className="w-12 h-12 border-2 border-gray-300 rounded-xl flex items-center justify-center text-gray-500 hover:text-black hover:border-black transition-all">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {alreadyInCart && (
              <Link
                href="/cart"
                className="w-full flex items-center justify-center gap-2 py-3 bg-black hover:bg-gray-800 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg mb-6"
              >
                Go to Cart <ChevronRight className="w-4 h-4" />
              </Link>
            )}

            {/* Trust Badges */}
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 space-y-3">
              {[
                { icon: Truck, text: 'Free delivery on orders over $500', sub: 'Standard: $15' },
                { icon: RotateCcw, text: '30-day hassle-free returns', sub: 'Free return shipping' },
                { icon: ShieldCheck, text: '2-year manufacturer warranty', sub: 'Genuine product guaranteed' },
              ].map(({ icon: Icon, text, sub }) => (
                <div key={text} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white border border-gray-300 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-gray-900" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{text}</p>
                    <p className="text-xs text-gray-500">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Seller Info */}
            {product?.seller && (
              <div className="mt-4 bg-gray-50 rounded-xl border border-gray-200 p-4">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Sold by</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900">{product.seller.name}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.seller?.rating || 0) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600 ml-1">{product.seller.rating}</span>
                    </div>
                  </div>
                  <button className="text-gray-900 hover:underline text-xs font-bold">Visit Store</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-12">
          <div className="flex gap-6 border-b border-gray-200 mb-6 overflow-x-auto">
            {['overview', 'specs', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`py-3 px-1 border-b-2 font-bold text-sm transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'overview' ? 'Overview' : tab === 'specs' ? 'Specifications' : 'Reviews'}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Key Highlights */}
              <div>
                <h2 className="text-2xl font-black text-gray-900 mb-4">Key Highlights</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {product?.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed text-base">{product?.description}</p>
              </div>

              {/* Additional Info */}
              {(product?.warranty || product?.returnPolicy) && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {product?.warranty && (
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                          <ShieldCheck className="w-5 h-5 text-gray-900" />
                          Warranty
                        </h4>
                        <p className="text-sm text-gray-700">{product.warranty}</p>
                      </div>
                    )}
                    {product?.returnPolicy && (
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                          <RotateCcw className="w-5 h-5 text-gray-900" />
                          Return Policy
                        </h4>
                        <p className="text-sm text-gray-700">{product.returnPolicy}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Specifications Tab */}
          {activeTab === 'specs' && (
            <div className="grid md:grid-cols-2 gap-6">
              {product?.specs && Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">{key}</p>
                  <p className="text-gray-900 font-semibold">{value}</p>
                </div>
              ))}
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-8">
              {/* Rating Summary */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <div className="flex items-start gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-black text-gray-900 mb-1">{product?.rating}</div>
                    <div className="flex items-center justify-center mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(product?.rating || 0) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">Based on {product?.reviewCount.toLocaleString()} ratings</p>
                  </div>

                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => {
                      const percentage = (Math.random() * 50 + (6 - stars) * 10);
                      return (
                        <div key={stars} className="flex items-center gap-2">
                          <span className="text-sm text-gray-600 w-8">{stars} ★</span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-400 rounded-full" style={{ width: `${percentage}%` }} />
                          </div>
                          <span className="text-sm text-gray-600 w-12">{Math.round(percentage / 10)}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Individual Reviews */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Customer Reviews</h3>
                <div className="space-y-4">
                  {(product?.reviews || MOCK_REVIEWS).map((review) => (
                    <div key={review.id} className="border border-gray-200 rounded-xl p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-gray-900">{review.author}</span>
                            {review.verified && (
                              <span className="inline-flex items-center gap-0.5 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">
                                <Verified className="w-3 h-3" /> Verified Purchase
                              </span>
                            )}
                          </div>
                          <p className="font-semibold text-gray-900">{review.title}</p>
                        </div>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed mb-2">{review.content}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{review.date}</span>
                        <button className="inline-flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-2 py-1 rounded transition-colors">
                          <ThumbsUp className="w-3.5 h-3.5" />
                          Helpful ({review.helpful})
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-gray-200 pt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-gray-900">
                More in <span className="text-gray-500">{product?.category && CATEGORY_LABELS[product.category]}</span>
              </h2>
              <Link href={`/shop?category=${product?.category}`} className="text-sm font-bold text-gray-900 hover:underline flex items-center gap-1">
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

// Mock reviews data for demonstration
const MOCK_REVIEWS: CustomerReview[] = [
  {
    id: '1',
    author: 'John Anderson',
    rating: 5,
    date: '2 days ago',
    title: 'Excellent product, highly recommend!',
    content: 'Amazing quality and fast delivery. The product exceeded my expectations. Customer service was helpful when I had a question. Will definitely buy again!',
    verified: true,
    helpful: 24,
  },
  {
    id: '2',
    author: 'Sarah Johnson',
    rating: 4,
    date: '1 week ago',
    title: 'Great value for money',
    content: 'Good quality product at a reasonable price. Works as described. Only minor issue was packaging could be better, but overall satisfied.',
    verified: true,
    helpful: 18,
  },
  {
    id: '3',
    author: 'Mike Chen',
    rating: 5,
    date: '2 weeks ago',
    title: 'Perfect! Exactly what I needed',
    content: 'This product is perfect for my needs. Performance is outstanding and it arrived on time. Definitely worth the investment.',
    verified: true,
    helpful: 32,
  },
  {
    id: '4',
    author: 'Emily Rodriguez',
    rating: 4,
    date: '3 weeks ago',
    title: 'Good but has minor flaws',
    content: 'Overall good product quality. Does what it promises. Had a small defect but seller replaced it without hassle.',
    verified: false,
    helpful: 12,
  },
];
