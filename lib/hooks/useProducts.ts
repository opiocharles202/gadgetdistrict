'use client';

import { useState, useEffect, useCallback } from 'react';
import { Product, ProductCategory } from '../types';
import { productService } from '../services/productService';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const inventory = productService.initializeInventory();
    setProducts(inventory);
    setFilteredProducts(inventory);
    setIsLoading(false);
  }, []);

  const applyFilters = useCallback(
    (category: ProductCategory | 'all', query: string) => {
      const results = productService.filterAndSearchProducts(category, query);
      setFilteredProducts(results);
    },
    []
  );

  const handleCategoryChange = useCallback(
    (category: ProductCategory | 'all') => {
      setActiveCategory(category);
      applyFilters(category, searchQuery);
    },
    [searchQuery, applyFilters]
  );

  const handleSearchChange = useCallback(
    (query: string) => {
      setSearchQuery(query);
      applyFilters(activeCategory, query);
    },
    [activeCategory, applyFilters]
  );

  return {
    products,
    filteredProducts,
    activeCategory,
    searchQuery,
    isLoading,
    handleCategoryChange,
    handleSearchChange,
  };
}
