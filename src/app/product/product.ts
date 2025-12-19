import { ChangeDetectionStrategy, Component, input, inject } from '@angular/core';
import { DecimalPipe, NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { Product as ProductModel } from '../models/product.interface';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product',
  imports: [NgOptimizedImage, DecimalPipe, MatButtonModule, MatSnackBarModule, RouterLink],
  templateUrl: './product.html',
  styleUrl: './product.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Product {
  product = input.required<ProductModel>();
  readonly fallbackImage = '/image/NO-Image.jpg';
  private readonly cart = inject(CartService);
  private readonly snack = inject(MatSnackBar);

  onImgError(ev: Event): void {
    const img = ev.target as HTMLImageElement | null;
    if (img && img.src.indexOf(this.fallbackImage) === -1) {
      img.src = this.fallbackImage;
    }
  }

  onAddToCart(): void {
    const p = this.product();
    if (p && p.stock > 0) {
      this.cart.add(p, 1);
    }
  }
}
