import { Component, OnInit } from '@angular/core';
import { SuppliersService } from '../../services/suppliers.service';  // Importar el servicio de proveedores

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html'
})
export class SuppliersComponent implements OnInit {

  proveedores: any[] = [];  // Arreglo para almacenar la lista de proveedores
  errorMessage: string = '';  // Mensaje de error en caso de fallos al cargar proveedores
  isLoading: boolean = true;  // Variable para mostrar un indicador de carga

  constructor(private suppliersService: SuppliersService) {}  // Inyectar el servicio de proveedores

  // Método que se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    this.loadSuppliers();  // Cargar los proveedores al inicializar el componente
  }

  // Método para cargar la lista de proveedores desde el servicio
  loadSuppliers(): void {
    this.suppliersService.getProveedores().subscribe(
      (data) => {
        this.proveedores = data;  // Asignar los datos de proveedores a la variable
        this.isLoading = false;  // Ocultar el indicador de carga una vez que los datos se obtengan
      },
      (error) => {
        console.error('Error al obtener proveedores:', error);  // Log de error para depuración
        this.errorMessage = 'Error al cargar proveedores. Por favor, inténtalo de nuevo más tarde.';  // Mostrar mensaje de error
        this.isLoading = false;  // Detener el indicador de carga incluso en caso de error
      }
    );
  }

}
