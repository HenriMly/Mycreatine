import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  fetchProducts() {
    fetch('localhost:3000/products')
  }
}
