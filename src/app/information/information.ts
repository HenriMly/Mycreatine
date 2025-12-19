import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-information',
  imports: [FormsModule, RouterLink, NgOptimizedImage, CurrencyPipe, MatButtonModule],
  template: `

  <div class="cart-list" role="list">
    @for (item of items(); track item.id) {
        <div class="cart-item" role="listitem">
            <a class="media" [routerLink]="['/product', item.id]" aria-label="Voir {{ item.title }}">
                <img [ngSrc]="item.imageUrl || '/image/NO-Image.jpg'" width="160" height="160" alt="{{ item.title }}" />
            </a>
            <div class="info">
                <h2 class="title"><a [routerLink]="['/product', item.id]">{{ item.title }}</a></h2>
                <p class="price">Prix: {{ item.price | currency:'EUR' }}</p>
                <label class="qty-label" for="qty-{{ item.id }}">Quantité</label>
                <input id="qty-{{ item.id }}" type="number" min="0" [value]="item.quantity"
                                (change)="updateQty(item.id, $any($event.target).value)"
                                (blur)="updateQty(item.id, $any($event.target).value)"
                                aria-describedby="qty-help-{{ item.id }}" />
                <div class="item-actions">
                    <button matButton aria-label="Retirer {{ item.title }}" (click)="remove(item.id)">Retirer</button>
                </div>
            </div>
        </div>
    }
</div>

  <form #userForm="ngForm" (ngSubmit)=infoForm(userForm.value)>
    <input ngModel #test="ngModel" name="name" required type="text" placeholder='Your Name' />
    <input ngModel #test="ngModel" name="surname" required type="text" placeholder='Your Surname' />
    <input ngModel #test="ngModel" name="email" required type="email" placeholder='mail@mail.mail' />
    <input ngModel #test="ngModel" name="adresse" required type="text" placeholder='Your Adresse' />
    <input ngModel #test="ngModel" name="city" required type="text" placeholder='Your City' />
    <input ngModel #test="ngModel" name="zip" required type="text" placeholder='Your ZIP Code' />
    <input ngModel #test="ngModel" name="country" required type="text" placeholder='Your Country' />

    <button type='submit' [disabled]="test.invalid">Submit</button>
  </form>
  `,
  styleUrl: './information.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Information {
  private readonly cart = inject(CartService);

  items = this.cart.items;

  remove(id: string): void { this.cart.remove(id); }
  updateQty(id: string, value: string | number): void {
    const qty = typeof value === 'string' ? Number.parseInt(value, 10) : value;
    this.cart.updateQuantity(id, Number.isFinite(qty) ? qty : 1);
  }

  infoForm(value: any) {
      console.log(value);
  }

  

}
