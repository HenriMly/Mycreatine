import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { Product } from '../product/product';
import { Product as ProductModel } from '../models/product.interface';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';
 
@Component({
  selector: 'app-product-page',
  imports: [Product],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPage implements OnInit, OnDestroy {
  private readonly api = inject(ApiService);
  private sub?: Subscription;
  readonly products = signal<ProductModel[]>([]);

  ngOnInit(): void {
    this.sub = this.api.listProducts('creatine').subscribe({
      next: (items) => this.products.set(items),
      error: () => this.products.set([]),
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
