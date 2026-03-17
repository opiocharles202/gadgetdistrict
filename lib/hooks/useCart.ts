'use client';

import { useState, useEffect, useCallback } from 'react';
import { Cart, CartItem, CartTotals, Product } from '../types';
import { cartService } from '../services/cartService';
import { storageService, STORAGE_KEYS } from '../services/storageService';

export function useCart() {
  const [cart, setCart] = useState<Cart>({ items: [], updatedAt: Date.now() });
  const [totals, setTotals] = useState<CartTotals>({ subtotal: 0, tax: 0, shipping: 0, total: 0, itemCount: 0 });

  useEffect(() => {
    const persistedCart = cartService.loadCart();
    setCart(persistedCart);
    setTotals(cartService.calculateCartTotals(persistedCart.items));
  }, []);

  const persistAndUpdateCart = useCallback((updatedCart: Cart) => {
    cartService.saveCart(updatedCart);
    setCart(updatedCart);
    setTotals(cartService.calculateCartTotals(updatedCart.items));
  }, []);

  const addToCart = useCallback(
    (product: Product, quantity = 1) => {
      const updatedCart = cartService.addItemToCart(cart, product, quantity);
      persistAndUpdateCart(updatedCart);
    },
    [cart, persistAndUpdateCart]
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      const updatedCart = cartService.removeItemFromCart(cart, productId);
      persistAndUpdateCart(updatedCart);
    },
    [cart, persistAndUpdateCart]
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      const updatedCart = cartService.updateItemQuantity(cart, productId, quantity);
      persistAndUpdateCart(updatedCart);
    },
    [cart, persistAndUpdateCart]
  );

  const clearCart = useCallback(() => {
    const emptyCart = cartService.clearCart();
    setCart(emptyCart);
    setTotals(cartService.calculateCartTotals([]));
  }, []);

  const isInCart = useCallback(
    (productId: string) => cartService.isProductInCart(cart, productId),
    [cart]
  );

  return { cart, totals, addToCart, removeFromCart, updateQuantity, clearCart, isInCart };
}
