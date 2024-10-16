import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  private apiUrl = 'http://54.227.145.10/api/producto/listar-todo';  // API para obtener productos
  private apiCreateUpdateUrl = 'http://54.227.145.10/api/producto/crear-o-actualizar';  // API para crear o actualizar productos

  constructor(private http: HttpClient) { }

  // Método para obtener los productos desde la API
  getProductos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Método para crear o actualizar un producto
  createOrUpdateProducto(producto: any): Observable<any> {
    return this.http.post<any>(this.apiCreateUpdateUrl, producto);
  }

}
