import { Cart, CartItem, CartTotals, Product } from '../types';
import { storageService, STORAGE_KEYS } from './storageService';

const TAX_RATE = 0.08;
const FREE_SHIPPING_THRESHOLD = 500;
const STANDARD_SHIPPING_COST = 15;

export const cartService = {
  loadCart(): Cart {
    return storageService.get<Cart>(STORAGE_KEYS.CART) ?? { items: [], updatedAt: Date.now() };
  },

  saveCart(cart: Cart): void {
    storageService.set(STORAGE_KEYS.CART, { ...cart, updatedAt: Date.now() });
  },

  addItemToCart(cart: Cart, product: Product, quantity = 1): Cart {
    const existingIndex = cart.items.findIndex((item) => item.product.id === product.id);
    const updatedItems =
      existingIndex >= 0
        ? cart.items.map((item, i) =>
            i === existingIndex ? { ...item, quantity: item.quantity + quantity } : item
          )
        : [...cart.items, { product, quantity }];
    return { items: updatedItems, updatedAt: Date.now() };
  },

  removeItemFromCart(cart: Cart, productId: string): Cart {
    return { items: cart.items.filter((item) => item.product.id !== productId), updatedAt: Date.now() };
  },

  updateItemQuantity(cart: Cart, productId: string, quantity: number): Cart {
    if (quantity <= 0) return cartService.removeItemFromCart(cart, productId);
    const updatedItems = cart.items.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    return { items: updatedItems, updatedAt: Date.now() };
  },

  clearCart(): Cart {
    const emptyCart: Cart = { items: [], updatedAt: Date.now() };
    cartService.saveCart(emptyCart);
    return emptyCart;
  },

  calculateCartTotals(items: CartItem[]): CartTotals {
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : STANDARD_SHIPPING_COST;
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax + shipping;
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    return { subtotal, tax, shipping, total, itemCount };
  },

  isProductInCart(cart: Cart, productId: string): boolean {
    return cart.items.some((item) => item.product.id === productId);
  },
};
