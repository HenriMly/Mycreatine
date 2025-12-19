import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe, CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-page',
  imports: [
    RouterLink,
    DecimalPipe,
    CurrencyPipe,
    NgOptimizedImage,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartPage {
  private readonly cart = inject(CartService);

  items = this.cart.items;
  total = this.cart.total;
  count = this.cart.count;

  remove(id: string): void {
    this.cart.remove(id);
  }
  clear(): void {
    this.cart.clear();
  }
  updateQty(id: string, value: string | number, event?: Event): void {
    const raw = typeof value === 'string' ? Number.parseInt(value, 10) : value;
    let qty = Number.isFinite(raw as number) ? Math.floor(raw as number) : 1;
    if (qty < 1) qty = 1;
    const item = this.items().find((i) => i.id === id);
    const maxStock = item?.stock ?? Number.POSITIVE_INFINITY;
    qty = Math.min(qty, maxStock);
    this.cart.updateQuantity(id, qty);
    const target = event?.target as HTMLInputElement | undefined;
    if (target) target.value = String(qty);
  }
  getStockHint(item: { stock?: number }): string {
    const stock = item.stock ?? 0;
    return stock === 0
      ? 'Rupture de stock'
      : `Stock: ${stock} unité${stock > 1 ? 's' : ''} disponible${stock > 1 ? 's' : ''}`;
  }
}
