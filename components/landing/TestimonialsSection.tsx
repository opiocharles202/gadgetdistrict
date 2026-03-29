const REVIEWS = [
  {
    name: 'Marcus T.',
    location: 'New York, USA',
    rating: 5,
    text: 'Got the iPhone 15 Pro Max — absolutely incredible. Shipped next day, packaged perfectly. The Gadget District is my go-to for everything tech now.',
    product: 'iPhone 15 Pro Max',
    avatar: 'MT',
    bg: 'bg-black',
  },
  {
    name: 'Sarah K.',
    location: 'London, UK',
    rating: 5,
    text: 'The MacBook Pro M3 Max is a beast. The Gadget District had the best price I found anywhere online. Customer service was also super helpful when I had questions.',
    product: 'MacBook Pro M3 Max',
    avatar: 'SK',
    bg: 'bg-gray-800',
  },
  {
    name: 'James O.',
    location: 'Lagos, Nigeria',
    rating: 5,
    text: 'Sony WH-1000XM5 headphones arrived in 3 days. The noise cancellation is absolutely insane. Will definitely shop here again.',
    product: 'Sony WH-1000XM5',
    avatar: 'JO',
    bg: 'bg-gray-700',
  },
  {
    name: 'Priya M.',
    location: 'Toronto, Canada',
    rating: 5,
    text: 'Ordered the ASUS ROG Zephyrus for gaming. Setup was smooth, product was genuine and sealed. Checkout was super fast. 10/10.',
    product: 'ASUS ROG Zephyrus G14',
    avatar: 'PM',
    bg: 'bg-gray-600',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-10 sm:py-14 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-gray-500 text-xs sm:text-sm font-bold uppercase tracking-widest mb-2">Real Customers</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900">What People Are Saying</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {REVIEWS.map(({ name, location, rating, text, product, avatar, bg }) => (
            <div key={name} className="bg-gray-50 border border-gray-100 rounded-2xl p-4 sm:p-5 flex flex-col gap-3 hover:shadow-md hover:border-gray-200 transition-all">
              <div className="flex gap-px">
                {Array.from({ length: rating }).map((_, i) => (
                  <span key={i} className="text-amber-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-gray-700 text-xs sm:text-sm leading-relaxed flex-1">&ldquo;{text}&rdquo;</p>
              <div className="pt-2 border-t border-gray-200">
                <p className="text-[10px] text-gray-400 mb-2">Purchased: <span className="text-gray-600 font-medium">{product}</span></p>
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 ${bg} rounded-full flex items-center justify-center text-white text-[10px] sm:text-xs font-black flex-shrink-0`}>
                    {avatar}
                  </div>
                  <div>
                    <p className="text-gray-900 text-xs font-bold">{name}</p>
                    <p className="text-gray-400 text-[10px]">{location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
