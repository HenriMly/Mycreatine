import { Component, input } from '@angular/core';
import { DecimalPipe, NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Product as ProductModel } from '../models/product.interface';

@Component({
  selector: 'app-product',
  imports: [NgOptimizedImage, DecimalPipe, MatButtonModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  product = input.required<ProductModel>();
  readonly fallbackImage = '/image/NO-Image.jpg';

  onImgError(ev: Event): void {
    const img = ev.target as HTMLImageElement | null;
    if (img && img.src.indexOf(this.fallbackImage) === -1) {
      img.src = this.fallbackImage;
    }
  }
}
