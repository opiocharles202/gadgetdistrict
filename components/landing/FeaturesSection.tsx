import { Truck, RotateCcw, ShieldCheck, Headphones, Zap, Award } from 'lucide-react';

const FEATURES = [
  { icon: Truck, title: 'Free Shipping', desc: 'On all orders over $500. Standard from just $15.', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
  { icon: RotateCcw, title: '30-Day Returns', desc: 'Changed your mind? Return for free within 30 days.', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100' },
  { icon: ShieldCheck, title: '2-Year Warranty', desc: 'Every product backed by full manufacturer warranty.', color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
  { icon: Headphones, title: '24/7 Support', desc: 'Real humans available every hour, every day.', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100' },
  { icon: Zap, title: 'Genuine Products', desc: '100% authentic from authorized distributors only.', color: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-100' },
  { icon: Award, title: 'Price Match', desc: 'We beat any lower price by 5%. No questions asked.', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
];

export default function FeaturesSection() {
  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-orange-500 text-xs sm:text-sm font-bold uppercase tracking-widest mb-2">Why TechHaven</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">Shop With Confidence</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {FEATURES.map(({ icon: Icon, title, desc, color, bg, border }) => (
            <div key={title} className={`bg-white border-2 ${border} rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 hover:shadow-md transition-all text-center sm:text-left`}>
              <div className={`inline-flex sm:flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl ${bg} mb-3 mx-auto sm:mx-0`}>
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${color}`} />
              </div>
              <h3 className="text-gray-900 font-bold text-xs sm:text-sm mb-1">{title}</h3>
              <p className="text-gray-500 text-[10px] sm:text-xs leading-relaxed hidden sm:block">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
