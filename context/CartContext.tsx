'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useCart } from '../lib/hooks/useCart';
import { Cart, CartTotals, Product } from '../lib/types';

interface CartContextValue {
  cart: Cart;
  totals: CartTotals;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const cartState = useCart();
  return <CartContext.Provider value={cartState}>{children}</CartContext.Provider>;
}

export function useCartContext(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCartContext must be used within CartProvider');
  return context;
}
