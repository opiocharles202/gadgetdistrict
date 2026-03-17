'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { PackageSearch } from 'lucide-react';
import { useProducts } from '../../lib/hooks/useProducts';
import { ProductCategory } from '../../lib/types';
import SearchBar from '../../components/shop/SearchBar';
import CategoryFilter from '../../components/shop/CategoryFilter';
import ProductCard from '../../components/shop/ProductCard';

function ShopContent() {
  const searchParams = useSearchParams();
  const {
    products,
    filteredProducts,
    activeCategory,
    searchQuery,
    isLoading,
    handleCategoryChange,
    handleSearchChange,
  } = useProducts();

  useEffect(() => {
    const categoryParam = searchParams.get('category') as ProductCategory | null;
    if (categoryParam && ['mobile', 'laptop', 'accessories'].includes(categoryParam)) {
      handleCategoryChange(categoryParam);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const productCounts = {
    all: products.length,
    mobile: products.filter((p) => p.category === 'mobile').length,
    laptop: products.filter((p) => p.category === 'laptop').length,
    accessories: products.filter((p) => p.category === 'accessories').length,
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <SearchBar value={searchQuery} onChange={handleSearchChange} />
        </div>
      </div>

      <div className="mb-8">
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          productCounts={productCounts}
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-2xl aspect-[4/5] animate-pulse" />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <PackageSearch className="w-16 h-16 text-gray-300 mb-6" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
          <button
            onClick={() => { handleSearchChange(''); handleCategoryChange('all'); }}
            className="px-6 py-3 bg-black hover:bg-gray-800 text-white rounded-xl font-semibold transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <p className="text-gray-500 text-sm mb-6">
            Showing <span className="text-gray-900 font-semibold">{filteredProducts.length}</span> products
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-gray-50 border-b border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-500">Discover our full range of premium electronics</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-gray-100 rounded-2xl aspect-[4/5] animate-pulse" />
            ))}
          </div>
        }>
          <ShopContent />
        </Suspense>
      </div>
    </main>
  );
}
