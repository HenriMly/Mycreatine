import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgOptimizedImage, DecimalPipe, CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Product as ProductModel } from '../models/product.interface';
import { ApiService } from '../api.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [NgOptimizedImage, DecimalPipe, RouterLink, MatButtonModule, MatSnackBarModule, CurrencyPipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(ApiService);
  private readonly cart = inject(CartService);
  private readonly snack = inject(MatSnackBar);
  private readonly id = this.route.snapshot.paramMap.get('id') ?? '';

  readonly product = signal<ProductModel | null>(null);

  readonly fallbackImage = '/image/NO-Image.jpg';

  onImgError(ev: Event): void {
    const img = ev.target as HTMLImageElement | null;
    if (img && img.src.indexOf(this.fallbackImage) === -1) {
      img.src = this.fallbackImage;
    }
  }

  constructor() {
    if (this.id) {
      this.api.getProductById(this.id).subscribe({
        next: (item) => this.product.set(item)
      });
    }
  }

  onAddToCart(): void {
    const p = this.product();
    if (p && p.stock > 0) {
      this.cart.add(p, 1);
    }
  }
}
