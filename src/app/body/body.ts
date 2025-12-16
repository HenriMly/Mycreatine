import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../product/product';
import { mockedProducts } from '../data/mockedProduct';
import { Product as ProductModel } from '../models/product.interface';

@Component({
  selector: 'app-body',
  imports: [NgOptimizedImage, MatButtonModule, MatCardModule, Product],
  templateUrl: './body.html',
  styleUrl: './body.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Body {
  readonly products = signal<ProductModel[]>(mockedProducts);
}
