import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';

export default function PromoSection() {
  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div className="relative overflow-hidden rounded-2xl bg-black p-6 sm:p-8 lg:p-10 min-h-[200px] sm:min-h-[240px] flex flex-col justify-between">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-500/10 rounded-full pointer-events-none" />
            <div>
              <div className="inline-flex items-center gap-1.5 bg-orange-500/20 rounded-full px-3 py-1 mb-4">
                <Zap className="w-3 h-3 text-orange-400" />
                <span className="text-orange-400 text-xs font-bold">Up to 25% Off</span>
              </div>
              <h3 className="text-white text-xl sm:text-2xl lg:text-3xl font-black mb-2 leading-tight">
                Premium Laptops<br />Sale
              </h3>
              <p className="text-white/60 text-xs sm:text-sm">MacBook, Dell XPS, ASUS ROG and more</p>
            </div>
            <Link href="/shop?category=laptop" className="self-start flex items-center gap-2 px-5 py-2.5 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-all text-sm mt-4 sm:mt-5 group">
              Shop Laptops <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 p-6 sm:p-8 lg:p-10 min-h-[200px] sm:min-h-[240px] flex flex-col justify-between">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full pointer-events-none" />
            <div>
              <div className="inline-flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1 mb-4">
                <Zap className="w-3 h-3 text-white" />
                <span className="text-white text-xs font-bold">New Arrivals</span>
              </div>
              <h3 className="text-white text-xl sm:text-2xl lg:text-3xl font-black mb-2 leading-tight">
                Latest Phones<br />2024 Models
              </h3>
              <p className="text-white/80 text-xs sm:text-sm">iPhone 15, Galaxy S24, Pixel 9 & more</p>
            </div>
            <Link href="/shop?category=mobile" className="self-start flex items-center gap-2 px-5 py-2.5 bg-black text-white font-bold rounded-xl hover:bg-gray-900 transition-all text-sm mt-4 sm:mt-5 group">
              Shop Phones <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
