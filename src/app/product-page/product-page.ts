import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Product } from '../product/product';
import { Product as ProductModel } from '../models/product.interface';
import { mockedProducts } from '../data/mockedProduct';
 
@Component({
  selector: 'app-product-page',
  imports: [Product],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPage {
  readonly products = signal<ProductModel[]>(mockedProducts);
}
