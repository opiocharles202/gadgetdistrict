export type ProductCategory = 'mobile' | 'laptop' | 'accessories';

export type ProductBadge = 'New' | 'Sale' | 'Hot' | 'Best Seller';

export interface CustomerReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
  helpful: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  highlights: string[];
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  brand: string;
  image: string;
  images?: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  badge?: ProductBadge;
  specs: Record<string, string>;
  reviews?: CustomerReview[];
  warranty?: string;
  returnPolicy?: string;
  seller?: {
    name: string;
    rating: number;
    followers: number;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  updatedAt: number;
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  paymentMethod: 'card' | 'paypal' | 'cod';
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  customerInfo: CustomerInfo;
  createdAt: number;
  status: 'confirmed';
}

export interface CartTotals {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  itemCount: number;
}
