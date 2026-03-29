import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, Star, Truck } from 'lucide-react';

const HERO_STATS = [
  { value: '50K+', label: 'Happy Customers' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '500+', label: 'Products' },
  { value: '24/7', label: 'Support' },
];

export default function HeroSection() {
  return (
    <section className="relative bg-black overflow-hidden">
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-white/8 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-white/4 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-0 sm:pt-16 lg:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="order-2 lg:order-1 pb-12 lg:pb-20">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 mb-6 sm:mb-8">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              <span className="text-white text-xs sm:text-sm font-semibold">New Arrivals Just Dropped</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.05] mb-4 sm:mb-6">
              Premium Tech.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
                Unbeatable Prices.
              </span>
            </h1>

            <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-lg">
              From the latest iPhones to powerhouse laptops — discover over 500 curated products from brands you trust, at prices that won&apos;t hurt.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10 sm:mb-12">
              <Link href="/shop" className="flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 bg-white hover:bg-gray-100 text-black font-black rounded-xl transition-all hover:shadow-2xl hover:scale-[1.02] active:scale-100 text-sm sm:text-base">
                Shop All Products
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <Link href="/shop?category=mobile" className="flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 bg-transparent border-2 border-white/20 hover:border-white/40 text-white font-semibold rounded-xl transition-all text-sm sm:text-base">
                View Phones
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {[
                { icon: ShieldCheck, label: '2-Year Warranty' },
                { icon: Truck, label: 'Free Shipping' },
                { icon: Star, label: '4.9 / 5 Stars' },
                { icon: Zap, label: 'Genuine Products' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-white/50">
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2 relative pt-8 sm:pt-12 lg:pt-20 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-full">
              <img
                src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=700&q=85"
                alt="iPhone 15 Pro Max"
                className="w-full object-cover rounded-t-2xl lg:rounded-t-3xl shadow-2xl"
                style={{ maxHeight: '520px', objectPosition: 'top' }}
              />
              <div className="absolute -left-3 sm:-left-6 top-1/4 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-2xl border border-gray-100 max-w-[160px] sm:max-w-[200px]">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-900 text-xs sm:text-sm font-bold leading-tight">iPhone 15 Pro</p>
                    <p className="text-gray-500 text-[10px] sm:text-xs font-semibold">Just added to cart!</p>
                  </div>
                </div>
              </div>
              <div className="absolute -right-3 sm:-right-5 top-1/3 bg-white rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-2xl border border-gray-100">
                <div className="flex gap-px mb-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-900 text-xs sm:text-sm font-black">4.9 / 5.0</p>
                <p className="text-gray-400 text-[9px] sm:text-xs">2,341 reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 mt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {HERO_STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-xl sm:text-2xl lg:text-3xl font-black text-white">{value}</p>
                <p className="text-white/50 text-xs sm:text-sm mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
