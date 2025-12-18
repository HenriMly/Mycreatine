import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from './models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly BASE_URL = 'http://localhost:3000';

  listProducts(category?: string): Observable<Product[]> {
    const url = category
      ? `${this.BASE_URL}/products/${encodeURIComponent(category)}`
      : `${this.BASE_URL}/products`;
    return this.http.get<ApiListResponse>(url).pipe(
      map((res) => res.data.map(this.mapApiProduct))
    );
  }

  getProductById(id: string | number): Observable<Product | null> {
    const url = `${this.BASE_URL}/products/creatine/${encodeURIComponent(String(id))}`;
    return this.http.get<ApiItemResponse>(url).pipe(
      map((res) => (res?.data ? this.mapApiProduct(res.data) : null))
    );
  }

  private mapApiProduct = (item: ApiProduct): Product => {
    const img = item.image;
    const src = img?.formats?.medium?.url || img?.url || undefined;
    const absolute = src && (src.startsWith('http://') || src.startsWith('https://'))
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
