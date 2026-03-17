'use client';

import { Smartphone, Laptop, Headphones, LayoutGrid } from 'lucide-react';
import { ProductCategory } from '../../lib/types';

type FilterCategory = ProductCategory | 'all';

interface CategoryFilterProps {
  activeCategory: FilterCategory;
  onCategoryChange: (category: FilterCategory) => void;
  productCounts: Record<FilterCategory, number>;
}

const FILTER_OPTIONS: { id: FilterCategory; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'all', label: 'All Products', icon: LayoutGrid },
  { id: 'mobile', label: 'Mobiles', icon: Smartphone },
  { id: 'laptop', label: 'Laptops', icon: Laptop },
  { id: 'accessories', label: 'Accessories', icon: Headphones },
];

export default function CategoryFilter({ activeCategory, onCategoryChange, productCounts }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTER_OPTIONS.map(({ id, label, icon: Icon }) => {
        const isActive = activeCategory === id;
        return (
          <button
            key={id}
            onClick={() => onCategoryChange(id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border-2 ${
              isActive
                ? 'bg-black text-white border-black shadow-md'
                : 'bg-white text-gray-600 border-gray-200 hover:text-black hover:border-gray-400'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
              {productCounts[id] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}
