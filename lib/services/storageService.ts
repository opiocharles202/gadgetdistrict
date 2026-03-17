const STORAGE_PREFIX = 'techhaven_';

export const storageService = {
  get<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;
    try {
      const serialized = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
      return serialized ? (JSON.parse(serialized) as T) : null;
    } catch {
      return null;
    }
  },

  set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
    } catch {
      console.error(`Failed to persist "${key}" to localStorage`);
    }
  },

  update<T extends object>(key: string, partial: Partial<T>): void {
    const existing = storageService.get<T>(key);
    const updated = { ...(existing ?? {}), ...partial } as T;
    storageService.set(key, updated);
  },

  remove(key: string): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
  },

  clear(): void {
    if (typeof window === 'undefined') return;
    Object.keys(localStorage)
      .filter((k) => k.startsWith(STORAGE_PREFIX))
      .forEach((k) => localStorage.removeItem(k));
  },
};

export const STORAGE_KEYS = {
  CART: 'cart',
  PRODUCTS: 'products',
  ORDERS: 'orders',
} as const;
