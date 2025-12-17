import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductPage } from './product-page';
import { mockedProducts } from '../data/mockedProduct';

describe('ProductPage', () => {
  let component: ProductPage;
  let fixture: ComponentFixture<ProductPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders a tile for each mocked product', async () => {
    fixture.detectChanges();
    const tiles = fixture.nativeElement.querySelectorAll('app-product');
    expect(tiles.length).toBe(mockedProducts.length);
  });
});
