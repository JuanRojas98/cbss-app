import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Category, Product} from "@models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  getProducts() {
    return this.http.get<Product[]>('/products');
  }

  getProduct(id: number) {
    return this.http.get<Product>(`/products/${id}`);
  }

  createProduct(body: Product) {
    return this.http.post('/products', body);
  }

  updateProduct(id: number, product: Partial<Product>) {
    return this.http.put(`/products/${id}`, product);
  }

  getCategories() {
    return this.http.get<Category[]>('/products/categories');
  }
}
