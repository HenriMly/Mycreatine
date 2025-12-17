import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetail } from './product-detail';
import { ActivatedRoute } from '@angular/router';
import { mockedProducts } from '../data/mockedProduct';

describe('ProductDetail', () => {
  let component: ProductDetail;
  let fixture: ComponentFixture<ProductDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetail],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => mockedProducts[0].id } } },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displays product title from route id', async () => {
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('.title');
    expect(title?.textContent).toContain(mockedProducts[0].title);
  });
});
