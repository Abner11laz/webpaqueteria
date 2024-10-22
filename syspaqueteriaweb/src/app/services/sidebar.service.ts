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
        { titulo: 'Clientes', url: 'customers', icono: 'fa fa-address-book' },  
        { 
          titulo: 'Ventas', 
          url: 'sales', 
          icono: 'fa fa-shopping-cart',
          submenu: [  // Submenú de Ventas
            { titulo: 'Ventas sin ruta', url: 'pendings-sales', icono: 'fa fa-hourglass' },
            { titulo: 'Ventas con ruta', url: 'transport-sales', icono: 'fa fa-truck' }
          ] 
        }
      ]
    }
  ];

    constructor(private ribbonService: BreadcrumbsService) {}

    // Se comenta setView para verificar el funcionamiento de ocultar y mostrar el ribbon
    changeView(view: string) {
      this.ribbonService.setView(view); // Cambia la vista seleccionada
    }
}
