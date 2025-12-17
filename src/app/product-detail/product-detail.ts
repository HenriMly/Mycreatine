import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgOptimizedImage, DecimalPipe, CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Product as ProductModel } from '../models/product.interface';
import { mockedProducts } from '../data/mockedProduct';

@Component({
  selector: 'app-product-detail',
  imports: [NgOptimizedImage, DecimalPipe, RouterLink, MatButtonModule, CurrencyPipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly id = this.route.snapshot.paramMap.get('id') ?? '';

  readonly product = signal<ProductModel | null>(
    mockedProducts.find(p => p.id === this.id) ?? null
  );

  readonly fallbackImage = '/image/NO-Image.jpg';

  onImgError(ev: Event): void {
    const img = ev.target as HTMLImageElement | null;
    if (img && img.src.indexOf(this.fallbackImage) === -1) {
      img.src = this.fallbackImage;
    }
  }
}
