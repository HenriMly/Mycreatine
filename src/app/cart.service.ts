import { Injectable, computed, signal } from '@angular/core';
import { Product } from './models/product.interface';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  imageUrl?: string;
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
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
        return next;
      }
      return [
        ...list,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity,
        },
      ];
    });
  }

  remove(productId: string): void {
    this.items.update((list) => list.filter((i) => i.id !== productId));
  }

  updateQuantity(productId: string, qty: number): void {
    const quantity = Math.max(0, Math.floor(qty));
    this.items.update((list) => {
      const idx = list.findIndex((i) => i.id === productId);
      if (idx === -1) return list;
      if (quantity === 0) {
        return list.filter((i) => i.id !== productId);
      }
      const next = [...list];
      next[idx] = { ...next[idx], quantity };
      return next;
    });
  }

  clear(): void {
    this.items.set([]);
  }
}
