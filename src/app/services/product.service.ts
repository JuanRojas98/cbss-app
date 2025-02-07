import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Category, Product} from "@models/product";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private http: HttpClient
  ) {
  }

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

  createCategory(body: Category) {
    return this.http.post('/products/categories', body);
  }

  updateCategory(id: number, category: Partial<Category>) {
    return this.http.put(`/products/categories/${id}`, category);
  }
}
