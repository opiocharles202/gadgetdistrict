import Link from 'next/link';
import { Smartphone, Laptop, Headphones, ArrowRight } from 'lucide-react';

const CATEGORIES = [
  {
    id: 'mobile',
    label: 'Mobile Phones',
    sub: 'Flagships & Mid-range',
    count: '6',
    icon: Smartphone,
    href: '/shop?category=mobile',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80',
    color: 'from-blue-600 to-blue-800',
  },
  {
    id: 'laptop',
    label: 'Laptops',
    sub: 'Work, Create & Game',
    count: '6',
    icon: Laptop,
    href: '/shop?category=laptop',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80',
    color: 'from-gray-800 to-gray-950',
  },
  {
    id: 'accessories',
    label: 'Accessories',
    sub: 'Earbuds, Chargers & More',
    count: '8',
    icon: Headphones,
    href: '/shop?category=accessories',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    color: 'from-orange-500 to-orange-700',
  },
];

export default function CategoryShowcase() {
  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6 sm:mb-10">
          <div>
            <p className="text-orange-500 text-xs sm:text-sm font-bold uppercase tracking-widest mb-1 sm:mb-2">Shop by Category</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">Top Categories</h2>
          </div>
          <Link href="/shop" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-black transition-colors border border-gray-200 hover:border-gray-400 px-4 py-2 rounded-xl">
            All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {CATEGORIES.map(({ id, label, sub, count, icon: Icon, href, image, color }) => (
            <Link
              key={id}
              href={href}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 bg-white"
            >
              <div className="aspect-[16/9] sm:aspect-[4/3] overflow-hidden">
                <img
                  src={image}
                  alt={label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <div className={`inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${color} mb-2 sm:mb-3 shadow-lg`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-white/60 text-[10px] sm:text-xs mb-0.5">{count} Products</p>
                    <h3 className="text-white text-base sm:text-lg font-black leading-tight">{label}</h3>
                    <p className="text-white/60 text-[10px] sm:text-xs">{sub}</p>
                  </div>
                  <div className="w-8 h-8 bg-white/15 group-hover:bg-white/25 rounded-full flex items-center justify-center transition-all ml-3 flex-shrink-0">
                    <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
