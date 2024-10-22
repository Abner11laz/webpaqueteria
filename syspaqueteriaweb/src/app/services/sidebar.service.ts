import { Injectable } from '@angular/core';
import { BreadcrumbsService } from './breadcrumbs.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
    menu: any[] = [
      {
        titulo: 'Dashboard',
        icono: 'nav-icon fas fa-tachometer-alt',
        submenu: [
          { titulo: 'Usuarios', url: 'users', icono: 'fa fa-users' },
          { titulo: 'Productos', url: 'products', icono: 'fa fa-cubes' },
          { titulo: 'Clientes', url: 'customers', icono: 'fa fa-address-book' },  // Cambié el ícono para diferenciarlo de productos
<<<<<<< Updated upstream
          { titulo: 'Ventas', url: 'sales', icono: 'fa fa-shopping-cart' } , // Nueva opción agregada
         
=======
          { titulo: 'Ventas', url: 'sales', icono: 'fa fa-shopping-cart' },  // Nueva opción agregada
          { titulo: 'Proveedores', url: 'suppliers', icono: 'fa fa-truck' },  // Nueva opción agregada para proveedores
          { titulo: 'Reportes', url: 'reports', icono: 'fa fa-chart-bar' }    // Nueva opción para Reportes
>>>>>>> Stashed changes
        ]
      }
    ];

    constructor(private ribbonService: BreadcrumbsService) {}

    // Se comenta setView para verificar el funcionamiento de ocultar y mostrar el ribbon
    changeView(view: string) {
      this.ribbonService.setView(view); // Cambia la vista seleccionada
    }
}
