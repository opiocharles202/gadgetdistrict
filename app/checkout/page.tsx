'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, CreditCard, Smartphone, Truck, Shield, ChevronRight } from 'lucide-react';
import { useCartContext } from '../../context/CartContext';
import { orderService } from '../../lib/services/orderService';
import { CustomerInfo, Order } from '../../lib/types';

const DEFAULT_FORM: CustomerInfo = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  zipCode: '',
  paymentMethod: 'card',
};

export default function CheckoutPage() {
  const { cart, totals, clearCart } = useCartContext();
  const router = useRouter();
  const [form, setForm] = useState<CustomerInfo>(DEFAULT_FORM);
  const [errors, setErrors] = useState<Partial<CustomerInfo>>({});
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (cart.items.length === 0 && !confirmedOrder) {
      router.push('/shop');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<CustomerInfo> = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Valid email is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    if (!form.city.trim()) newErrors.city = 'City is required';
    if (!form.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (field: keyof CustomerInfo, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const order = orderService.createOrder(cart, totals, form);
    clearCart();
    setConfirmedOrder(order);
    setIsProcessing(false);
  };

  if (confirmedOrder) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-green-50 border-2 border-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-3">Order Confirmed!</h1>
          <p className="text-gray-600 mb-2">Thank you, {confirmedOrder.customerInfo.fullName}!</p>
          <p className="text-gray-400 text-sm mb-8">
            Order <span className="text-black font-mono font-bold bg-gray-100 px-2 py-0.5 rounded">{confirmedOrder.id}</span> placed successfully.
          </p>

          <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 text-left mb-8 shadow-sm">
            <h3 className="text-gray-900 font-bold mb-4 pb-3 border-b border-gray-100">Order Summary</h3>
            {confirmedOrder.items.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between text-sm py-2.5 border-b border-gray-50 last:border-0">
                <span className="text-gray-600 truncate flex-1 mr-4">{product.name} × {quantity}</span>
                <span className="text-gray-900 font-semibold flex-shrink-0">${(product.price * quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="flex justify-between font-black mt-4 pt-3 border-t border-gray-200">
              <span className="text-gray-900">Total Paid</span>
              <span className="text-gray-900 text-lg">${confirmedOrder.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="px-8 py-4 bg-black hover:bg-gray-800 text-white font-semibold rounded-2xl transition-all">
              Continue Shopping
            </Link>
            <Link href="/" className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-2xl border-2 border-gray-200 hover:border-gray-400 transition-all">
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const inputClass = (field: keyof CustomerInfo) =>
    `w-full bg-white border-2 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none transition-all ${
      errors[field] ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-black hover:border-gray-300'
    }`;

  return (
    <main className="min-h-screen bg-white">
      <div className="bg-gray-50 border-b border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-black hover:underline">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/cart" className="hover:text-black hover:underline">Cart</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-900 font-medium">Checkout</span>
          </nav>
          <Link href="/cart" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-black mb-3 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Cart
          </Link>
          <h1 className="text-4xl font-black text-gray-900">Checkout</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h2 className="text-gray-900 font-black text-lg mb-6 flex items-center gap-2">
                <Truck className="w-5 h-5 text-gray-700" /> Shipping Information
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-gray-700 text-sm font-semibold mb-1.5">Full Name</label>
                  <input className={inputClass('fullName')} placeholder="John Doe" value={form.fullName} onChange={(e) => handleFieldChange('fullName', e.target.value)} />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-1.5">Email</label>
                  <input className={inputClass('email')} placeholder="john@example.com" type="email" value={form.email} onChange={(e) => handleFieldChange('email', e.target.value)} />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-1.5">Phone</label>
                  <input className={inputClass('phone')} placeholder="+1 555 000 0000" value={form.phone} onChange={(e) => handleFieldChange('phone', e.target.value)} />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-gray-700 text-sm font-semibold mb-1.5">Address</label>
                  <input className={inputClass('address')} placeholder="123 Main Street, Apt 4B" value={form.address} onChange={(e) => handleFieldChange('address', e.target.value)} />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-1.5">City</label>
                  <input className={inputClass('city')} placeholder="New York" value={form.city} onChange={(e) => handleFieldChange('city', e.target.value)} />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-1.5">ZIP Code</label>
                  <input className={inputClass('zipCode')} placeholder="10001" value={form.zipCode} onChange={(e) => handleFieldChange('zipCode', e.target.value)} />
                  {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
              <h2 className="text-gray-900 font-black text-lg mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-gray-700" /> Payment Method
              </h2>
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
                  { id: 'paypal', label: 'PayPal', icon: Smartphone },
                  { id: 'cod', label: 'Cash on Delivery', icon: Truck },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => handleFieldChange('paymentMethod', id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-sm font-semibold ${
                      form.paymentMethod === id
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    {label}
                  </button>
                ))}
              </div>

              {form.paymentMethod === 'card' && (
                <div className="mt-5 grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-1.5">Card Number</label>
                    <input className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black hover:border-gray-300 transition-all" placeholder="4242 4242 4242 4242" />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-1.5">Expiry</label>
                    <input className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black hover:border-gray-300 transition-all" placeholder="MM / YY" />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-1.5">CVV</label>
                    <input className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black hover:border-gray-300 transition-all" placeholder="•••" type="password" maxLength={4} />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-gray-900 font-black text-lg mb-5">Order Summary</h2>

              <div className="space-y-2 mb-5 max-h-48 overflow-y-auto pr-1">
                {cart.items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex justify-between text-sm py-1.5 border-b border-gray-50 last:border-0">
                    <span className="text-gray-500 truncate flex-1 mr-2">{product.name} × {quantity}</span>
                    <span className="text-gray-900 font-semibold flex-shrink-0">${(product.price * quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm border-t border-gray-100 pt-4 mb-2">
                <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span className="text-gray-900 font-semibold">${totals.subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Tax (8%)</span><span className="text-gray-900 font-semibold">${totals.tax.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span className={totals.shipping === 0 ? 'text-green-600 font-bold' : 'text-gray-900 font-semibold'}>{totals.shipping === 0 ? 'FREE' : `$${totals.shipping.toFixed(2)}`}</span></div>
              </div>

              <div className="border-t-2 border-gray-100 pt-4 mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="text-gray-900 font-bold">Order Total</span>
                  <span className="text-2xl font-black text-gray-900">${totals.total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full py-4 bg-black hover:bg-gray-800 disabled:bg-gray-300 text-white font-bold rounded-2xl transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 active:scale-95"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4" />
                    Place Order · ${totals.total.toFixed(2)}
                  </>
                )}
              </button>
              <p className="text-gray-400 text-xs text-center mt-3 flex items-center justify-center gap-1">
                <Shield className="w-3 h-3" />
                Secured with 256-bit SSL (demo only)
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
