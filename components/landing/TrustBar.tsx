import { Truck, RotateCcw, ShieldCheck, Headphones } from 'lucide-react';

const TRUST_ITEMS = [
  { icon: Truck, title: 'Free Shipping', sub: 'On orders over $500' },
  { icon: RotateCcw, title: '30-Day Returns', sub: 'Hassle-free returns' },
  { icon: ShieldCheck, title: '2-Year Warranty', sub: 'All products covered' },
  { icon: Headphones, title: '24/7 Support', sub: 'Expert help always' },
];

export default function TrustBar() {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {TRUST_ITEMS.map(({ icon: Icon, title, sub }) => (
            <div key={title} className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">{title}</p>
                <p className="text-[10px] sm:text-xs text-gray-500 hidden sm:block">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
