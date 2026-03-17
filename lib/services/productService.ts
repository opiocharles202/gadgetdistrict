import { Product, ProductCategory } from '../types';
import { MOCK_PRODUCTS } from '../data/products';
import { storageService, STORAGE_KEYS } from './storageService';

export const productService = {
  initializeInventory(): Product[] {
    const existing = storageService.get<Product[]>(STORAGE_KEYS.PRODUCTS);
    if (existing && existing.length > 0) return existing;
    storageService.set(STORAGE_KEYS.PRODUCTS, MOCK_PRODUCTS);
    return MOCK_PRODUCTS;
  },

  getAllProducts(): Product[] {
    return storageService.get<Product[]>(STORAGE_KEYS.PRODUCTS) ?? MOCK_PRODUCTS;
  },

  getProductsByCategory(category: ProductCategory): Product[] {
    return productService.getAllProducts().filter((p) => p.category === category);
  },

  getProductById(id: string): Product | undefined {
    return productService.getAllProducts().find((p) => p.id === id);
  },

  getFeaturedProducts(limit = 8): Product[] {
    return productService
      .getAllProducts()
      .filter((p) => p.badge)
      .slice(0, limit);
  },

  searchProducts(query: string): Product[] {
    const normalizedQuery = query.toLowerCase().trim();
    if (!normalizedQuery) return productService.getAllProducts();
    return productService.getAllProducts().filter(
      (p) =>
        p.name.toLowerCase().includes(normalizedQuery) ||
        p.brand.toLowerCase().includes(normalizedQuery) ||
        p.description.toLowerCase().includes(normalizedQuery) ||
        p.category.toLowerCase().includes(normalizedQuery)
    );
  },

  filterAndSearchProducts(category: ProductCategory | 'all', query: string): Product[] {
    const allProducts = productService.getAllProducts();
    return allProducts.filter((p) => {
      const matchesCategory = category === 'all' || p.category === category;
      const normalizedQuery = query.toLowerCase().trim();
      const matchesSearch =
        !normalizedQuery ||
        p.name.toLowerCase().includes(normalizedQuery) ||
        p.brand.toLowerCase().includes(normalizedQuery) ||
        p.description.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesSearch;
    });
  },
};
