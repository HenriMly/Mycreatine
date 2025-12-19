import { Injectable, computed, signal } from '@angular/core';
import { Product } from './models/product.interface';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  imageUrl?: string;
  stock?: number;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  readonly items = signal<CartItem[]>([]);

  readonly count = computed(() => this.items().reduce((acc, i) => acc + i.quantity, 0));
  readonly total = computed(() => this.items().reduce((acc, i) => acc + i.price * i.quantity, 0));

  add(product: Product, qty: number = 1): void {
    const quantity = Math.max(1, Math.floor(qty));
    this.items.update((list) => {
      const idx = list.findIndex((i) => i.id === product.id);
      if (idx !== -1) {
        const next = [...list];
        const maxStock = next[idx].stock ?? Number.POSITIVE_INFINITY;
        const newQty = Math.min(next[idx].quantity + quantity, maxStock);
        next[idx] = { ...next[idx], quantity: newQty };
        return next;
      }
      return [
        ...list,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          stock: product.stock,
          quantity,
        },
      ];
    });
  }

  remove(productId: string): void {
    this.items.update((list) => list.filter((i) => i.id !== productId));
  }

  updateQuantity(productId: string, qty: number): void {
    const quantityRaw = Math.floor(qty);
    const nextQuantity = Math.max(1, quantityRaw);
    this.items.update((list) => {
      const idx = list.findIndex((i) => i.id === productId);
      if (idx === -1) return list;
      const next = [...list];
      const maxStock = next[idx].stock ?? Number.POSITIVE_INFINITY;
      next[idx] = { ...next[idx], quantity: Math.min(nextQuantity, maxStock) };
      return next;
    });
  }

  clear(): void {
    this.items.set([]);
  }
}
