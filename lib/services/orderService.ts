import { Order, CustomerInfo } from '../types';
import { storageService, STORAGE_KEYS } from './storageService';
import { Cart, CartTotals } from '../types';

export const orderService = {
  createOrder(cart: Cart, totals: CartTotals, customerInfo: CustomerInfo): Order {
    const order: Order = {
      id: `TH-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
      items: cart.items,
      subtotal: totals.subtotal,
      tax: totals.tax,
      shipping: totals.shipping,
      total: totals.total,
      customerInfo,
      createdAt: Date.now(),
      status: 'confirmed',
    };
    const existingOrders = storageService.get<Order[]>(STORAGE_KEYS.ORDERS) ?? [];
    storageService.set(STORAGE_KEYS.ORDERS, [order, ...existingOrders]);
    return order;
  },

  getOrderHistory(): Order[] {
    return storageService.get<Order[]>(STORAGE_KEYS.ORDERS) ?? [];
  },
};
