import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  URL_BASE = "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros";

  constructor(public http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>(`${this.URL_BASE}/bp/products`);
  }

  getProductById(id: string) {
    return this.http.get<boolean>(`${this.URL_BASE}/bp/products/verification`, { params: { id } });
  }

  createProduct(product: Product) {
    return this.http.post<Product>(`${this.URL_BASE}/bp/products`, product);
  }

  editProduct(product: Product) {
    return this.http.put<Product>(`${this.URL_BASE}/bp/products`, product);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.URL_BASE}/bp/products`, { params: { id } });
  }

}
