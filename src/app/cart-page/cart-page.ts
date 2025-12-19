import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe, CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-cart-page',
  imports: [RouterLink, DecimalPipe, CurrencyPipe, NgOptimizedImage, MatButtonModule],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartPage {
  private readonly cart = inject(CartService);

  items = this.cart.items;
  total = this.cart.total;
  count = this.cart.count;

  remove(id: string): void { this.cart.remove(id); }
  clear(): void { this.cart.clear(); }
  updateQty(id: string, value: string | number): void {
    const qty = typeof value === 'string' ? Number.parseInt(value, 10) : value;
    this.cart.updateQuantity(id, Number.isFinite(qty) ? qty : 1);
  }
}
