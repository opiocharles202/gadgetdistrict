import { Mail } from 'lucide-react';

export default function NewsletterSection() {
  return (
    <section className="py-10 sm:py-14 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-white mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3">
            Never Miss a Deal
          </h2>
          <p className="text-white/60 text-sm sm:text-base mb-6 sm:mb-8">
            Subscribe for exclusive offers, early access to new arrivals, and tech tips — straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-4 py-3 sm:py-3.5 focus:outline-none focus:border-white text-sm transition-all"
            />
            <button className="px-6 py-3 sm:py-3.5 bg-white hover:bg-gray-200 text-black font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-white/30 text-sm flex-shrink-0">
              Subscribe
            </button>
          </div>
          <p className="text-white/30 text-xs mt-3">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}
