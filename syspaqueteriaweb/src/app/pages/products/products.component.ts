import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service'; // Ajusta la ruta de acuerdo a tu estructura de carpetas
 // Importa el servicio

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productos: any[] = [];  // Inicializamos como un array vacío

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.loadProductos();  // Llamamos al método al iniciar el componente
  }

  loadProductos(): void {
    this.productsService.getProductos().subscribe(
      (data) => {
        // Aquí recibimos los datos de la API y los asignamos a "productos"
        this.productos = data;
      },
      (error) => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }
}
