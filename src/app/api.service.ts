import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { Product } from './models/product.interface';
import { CreateOrderDto, Order } from './models/order.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly BASE_URL = 'http://localhost:3000';
  private readonly ORDERS_BASE_URL = 'https://strapi-production-2ff5.up.railway.app';

  listProducts(category?: string): Observable<Product[]> {
    const url = category
      ? `${this.BASE_URL}/products/${encodeURIComponent(category)}`
      : `${this.BASE_URL}/products`;
    return this.http.get<ApiListResponse>(url).pipe(map((res) => res.data.map(this.mapApiProduct)));
  }

  getProductById(id: string | number): Observable<Product | null> {
    const itemId = encodeURIComponent(String(id));
    const primary$ = this.http.get<ApiItemResponse>(`${this.BASE_URL}/products/${itemId}`).pipe(
      map((res) => (res?.data ? this.mapApiProduct(res.data) : null)),
      catchError(() => of(null))
    );

    const byCategory$ = this.http
      .get<ApiItemResponse>(`${this.BASE_URL}/products/creatine/${itemId}`)
      .pipe(
        map((res) => (res?.data ? this.mapApiProduct(res.data) : null)),
        catchError(() => of(null))
      );

    const listFallback$ = this.listProducts().pipe(
      map((items) => items.find((p) => p.id === String(id)) ?? null),
      catchError(() => of(null))
    );

    const listCategoryFallback$ = this.listProducts('creatine').pipe(
      map((items) => items.find((p) => p.id === String(id)) ?? null),
      catchError(() => of(null))
    );

    return primary$.pipe(
      switchMap((p) => (p ? of(p) : byCategory$)),
      switchMap((p) => (p ? of(p) : listFallback$)),
      switchMap((p) => (p ? of(p) : listCategoryFallback$))
    );
  }

  private mapApiProduct = (item: ApiProduct): Product => {
    const img = item.image;
    const src = img?.formats?.medium?.url || img?.url || undefined;
    const absolute =
      src && (src.startsWith('http://') || src.startsWith('https://'))
        ? src
        : src
        ? `${this.BASE_URL}${src}`
        : undefined;
    return {
      id: String(item.id),
      title: item.title,
      description: item.description,
      price: item.price,
      stock: item.stock,
      imageUrl: absolute,
    };
  };


  createOrder(payload: CreateOrderDto) : Observable<Order> {
    const url = `${this.ORDERS_BASE_URL}/api/creatine-orders`;
    return this.http.post<Order>(url, payload);
  }
}

interface ApiListResponse {
  data: ApiProduct[];
  meta?: unknown;
}

interface ApiItemResponse {
  data: ApiProduct | null;
  meta?: unknown;
}

interface ApiProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  image?: {
    url?: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
  };
}
