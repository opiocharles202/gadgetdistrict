'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, ArrowRight, Trash2, Plus, Minus, Package, ChevronRight } from 'lucide-react';
import { useCartContext } from '../../context/CartContext';

export default function CartPage() {
  const { cart, totals, removeFromCart, updateQuantity } = useCartContext();

  if (cart.items.length === 0) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven&apos;t added anything yet.</p>
          <Link href="/shop" className="inline-flex items-center gap-2 px-8 py-4 bg-black hover:bg-gray-800 text-white font-semibold rounded-2xl transition-all">
            Start Shopping <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="bg-gray-50 border-b border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-black hover:underline">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-900 font-medium">Shopping Cart</span>
          </nav>
          <h1 className="text-4xl font-black text-gray-900 mb-1">Shopping Cart</h1>
          <p className="text-gray-500">{totals.itemCount} item{totals.itemCount !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-3">
            {cart.items.map(({ product, quantity }) => (
              <div key={product.id} className="bg-white border border-gray-200 rounded-2xl p-5 flex gap-5 hover:shadow-md transition-all hover:border-gray-300">
                <Link href={`/product/${product.id}`} className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-50 border border-gray-100">
                  <Image src={product.image} alt={product.name} fill className="object-cover" unoptimized />
                </Link>

                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">{product.brand}</p>
                  <Link href={`/product/${product.id}`} className="text-gray-900 font-semibold text-sm leading-tight hover:text-black hover:underline block mb-1 truncate">
                    {product.name}
                  </Link>
                  <p className="text-xs text-green-600 font-medium mb-3">In Stock</p>

                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-100 rounded-l-xl transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-gray-900 font-bold text-sm">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-100 rounded-r-xl transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-lg font-black text-gray-900">${(product.price * quantity).toLocaleString()}</span>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black font-medium transition-colors mt-2 py-2">
              <Package className="w-4 h-4" /> Continue Shopping
            </Link>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-gray-900 font-black text-xl mb-6">Order Summary</h2>

              <div className="space-y-3 mb-5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal ({totals.itemCount} items)</span>
                  <span className="text-gray-900 font-semibold">${totals.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Estimated Tax (8%)</span>
                  <span className="text-gray-900 font-semibold">${totals.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className={totals.shipping === 0 ? 'text-green-600 font-bold' : 'text-gray-900 font-semibold'}>
                    {totals.shipping === 0 ? 'FREE' : `$${totals.shipping.toFixed(2)}`}
                  </span>
                </div>
                {totals.shipping > 0 && (
                  <p className="text-xs text-gray-400">Add ${(500 - totals.subtotal).toFixed(2)} more for free shipping</p>
                )}
              </div>

              <div className="border-t-2 border-gray-100 pt-4 mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="text-gray-900 font-bold text-base">Order Total</span>
                  <span className="text-2xl font-black text-gray-900">${totals.total.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Includes all taxes and fees</p>
              </div>

              <Link
                href="/checkout"
                className="flex items-center justify-center gap-2 w-full py-4 bg-black hover:bg-gray-800 text-white font-bold rounded-2xl transition-all shadow-md hover:shadow-xl active:scale-95"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                <span>Secured checkout</span>
                <span>·</span>
                <span>30-day returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
