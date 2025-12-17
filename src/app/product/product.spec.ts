import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Product } from './product';
import { Product as ProductModel } from '../models/product.interface';

describe('Product', () => {
  let component: Product;
  let fixture: ComponentFixture<Product>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Product]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Product);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('disables add-to-cart when stock is 0', async () => {
    const p: ProductModel = { id: 'x', title: 'Zero', description: 'none', price: 9.99, stock: 0 };
    TestBed.runInInjectionContext(() => {
      component.product = p as any;
    });
    fixture.detectChanges();

    const btn: HTMLButtonElement | null = fixture.nativeElement.querySelector('.actions button');
    expect(btn).toBeTruthy();
    expect(btn!.disabled).toBe(true);
  });

  it('falls back to NO-Image.jpg when imageUrl missing', async () => {
    const p: ProductModel = { id: 'y', title: 'NoImg', description: 'none', price: 9.99, stock: 1 };
    TestBed.runInInjectionContext(() => {
      component.product = p as any;
    });
    fixture.detectChanges();

    const img: HTMLImageElement | null = fixture.nativeElement.querySelector('.media img');
    expect(img).toBeTruthy();
    img!.dispatchEvent(new Event('error'));
    expect(img!.getAttribute('src')).toContain('/image/NO-Image.jpg');
  });
});
