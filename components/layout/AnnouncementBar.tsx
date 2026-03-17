'use client';

import { useState } from 'react';
import { X, Truck } from 'lucide-react';

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="bg-black text-white text-xs sm:text-sm py-2 px-4 relative flex items-center justify-center gap-2 min-h-[36px]">
      <Truck className="w-3.5 h-3.5 flex-shrink-0 text-orange-400" />
      <span className="text-center">
        <span className="font-semibold text-orange-400">Free Shipping</span>
        <span className="text-white/80"> on all orders over $500 · </span>
        <span className="font-semibold text-white">Shop now</span>
      </span>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
