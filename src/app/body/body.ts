import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../product/product';
import { Product as ProductModel } from '../models/product.interface';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-body',
  imports: [NgOptimizedImage, MatButtonModule, MatCardModule, Product],
  templateUrl: './body.html',
  styleUrl: './body.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Body implements OnInit {
  private readonly api = inject(ApiService);
  private sub?: Subscription;
  readonly products = signal<ProductModel[]>([]);

  ngOnInit(): void {
    this.sub = this.api.listProducts('creatine').subscribe({
      next: (items) => this.products.set(this.getRandomProducts(items, 3)),
    });
  }

  private getRandomProducts(products: ProductModel[], count: number): ProductModel[] {
    const shuffled = [...products].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }
}
