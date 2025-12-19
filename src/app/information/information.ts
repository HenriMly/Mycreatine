import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../cart.service';
import { ApiService } from '../api.service';
import { CreateOrderDto } from '../models/order.interface';

@Component({
  selector: 'app-information',
  imports: [FormsModule, RouterLink, NgOptimizedImage, CurrencyPipe, MatButtonModule],
  template: `
    <div class="cart-list" role="list">
      @for (item of items(); track item.id) {
      <div class="cart-item" role="listitem">
        <a class="media" [routerLink]="['/product', item.id]" aria-label="Voir {{ item.title }}">
          <img
            [ngSrc]="item.imageUrl || '/image/NO-Image.jpg'"
            width="160"
            height="160"
            alt="{{ item.title }}"
          />
        </a>
        <div class="info">
          <h2 class="title">
            <a [routerLink]="['/product', item.id]">{{ item.title }}</a>
          </h2>
          <p class="price">Prix: {{ item.price | currency : 'EUR' }}</p>
          <label class="qty-label" for="qty-{{ item.id }}">Quantité</label>
          <input
            id="qty-{{ item.id }}"
            type="number"
            min="0"
            [value]="item.quantity"
            (change)="updateQty(item.id, $any($event.target).value)"
            (blur)="updateQty(item.id, $any($event.target).value)"
            aria-describedby="qty-help-{{ item.id }}"
          />
          <div class="item-actions">
            <button matButton aria-label="Retirer {{ item.title }}" (click)="remove(item.id)">
              Retirer
            </button>
          </div>
        </div>
      </div>
      }
    </div>

    <div>
      <label for="coupon">Code promo</label>
      <input
        id="coupon"
        [ngModel]="coupon()"
        (ngModelChange)="coupon.set($event)"
        name="coupon"
        type="text"
        placeholder="Code promo"
        aria-describedby="coupon-status"
      />
      <button mat-button type="button" (click)="applyCoupon()">Appliquer le code promo</button>
      <div id="coupon-status" [attr.aria-live]="couponError() ? 'assertive' : 'polite'">
        @if (isCouponApplied()) {
        <span role="status">Code appliqué: {{ coupon().trim() }}</span>
        } @else if (couponError()) {
        <span role="alert">{{ couponError() }}</span>
        }
      </div>
    </div>

    <form #userForm="ngForm" (ngSubmit)="infoForm(userForm.value)">
      <input ngModel #test="ngModel" name="name" required type="text" placeholder="Your Name" />
      <input
        ngModel
        #test="ngModel"
        name="email"
        required
        type="email"
        placeholder="mail@mail.mail"
      />
      <input
        ngModel
        #test="ngModel"
        name="adresse"
        required
        type="text"
        placeholder="Your Adresse"
      />
      <input ngModel name="city" required type="text" #country="ngModel" placeholder="Your City" />
      <input ngModel #test="ngModel" name="state" required type="text" placeholder="Your State" />
      <input ngModel #test="ngModel" name="zip" required type="text" placeholder="Your ZIP Code" />
      <input
        ngModel
        #test="ngModel"
        name="country"
        required
        type="text"
        pattern="^(France|FR|france|fr)$"
        placeholder="Your Country"
      />

      <button type="submit" [disabled]="userForm.invalid">Submit</button>
    </form>
  `,
  styleUrl: './information.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Information {
  private readonly cart = inject(CartService);
  private readonly api = inject(ApiService);

  items = this.cart.items;
  readonly coupon = signal<string>('');
  readonly isCouponApplied = signal<boolean>(false);
  readonly couponError = signal<string | null>(null);

  readonly discountedTotal = computed<number>(() => {
    const rawTotal = this.cart.total();
    if (!this.isCouponApplied()) {
      return rawTotal;
    }
    const code = this.coupon().trim().toLowerCase();
    return code === 'crea10' ? rawTotal * 0.9 : rawTotal;
  });

  remove(id: string): void {
    this.cart.remove(id);
  }
  updateQty(id: string, value: string | number): void {
    const qty = typeof value === 'string' ? Number.parseInt(value, 10) : value;
    this.cart.updateQuantity(id, Number.isFinite(qty) ? qty : 1);
  }

  applyCoupon(): void {
    const code = this.coupon().trim().toLowerCase();
    const applied = code === 'crea10';
    this.isCouponApplied.set(applied);
    this.couponError.set(
      !applied && code.length > 0 ? 'Code promo invalide. Vérifiez et réessayez.' : null
    );
  }

  infoForm(value: {
    name: string;
    email: string;
    adresse: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  }) {
    const items = this.items();
    if (items.length === 0) {
      return;
    }

    const code = this.coupon().trim().toLowerCase();
    const typedCoupon = code.length > 0;
    if (typedCoupon && !this.isCouponApplied()) {
      this.couponError.set('Code promo invalide. Vérifiez et réessayez.');
      return;
    }

    const total = this.isCouponApplied() ? this.discountedTotal() : this.cart.total();

    const dto: CreateOrderDto = {
      data: {
        customer: {
          name: value.name,
          email: value.email,
          address: value.adresse,
          city: value.city,
          state: value.state,
          zip: value.zip,
          country: value.country,
        },
        creatine_products: {
          connect: items.map((i) => i.id),
        },
        productsQuantity: {
          data: items.map((i) => ({ id: i.id, quantity: i.quantity })),
        },
        total,
      },
    };

    this.api.createOrder(dto).subscribe();
  }
}
