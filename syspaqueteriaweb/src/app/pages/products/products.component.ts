import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service'; // Ajusta la ruta de acuerdo a tu estructura de carpetas
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
 // Importa el servicio

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  productos: any[] = [];  // Inicializamos como un array vacío
  activeTab: string = 'manage'; // Pestaña activa inicial
  constructor(private productsService: ProductsService, private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
    this.loadProductos();  // Llamamos al método al iniciar el componente
    this.activeTab = 'manage'; // Cambia la pestaña activa cuando cambia la vista
  }
  navigateToCreateProducts() {
    this.router.navigate(['./products/create'], { relativeTo: this.route });
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
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
