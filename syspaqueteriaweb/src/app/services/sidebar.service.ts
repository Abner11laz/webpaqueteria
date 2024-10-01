import { Injectable } from '@angular/core';
import { BreadcrumbsService } from './breadcrumbs.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
    menu:any[]=[
      {
        titulo: 'Dashboard',
        icono: 'nav-icon fas fa-tachometer-alt',
        submenu:[
          {titulo: 'Usuarios', url:'usuarios', icono:'fa fa-users'},
          {titulo: 'Productos', url:'products', icono: 'fa fa-cubes'},
          {titulo: 'Clientes', url:'customers', icono: 'fa fa-cubes'}
        ]
      }
    ]

    constructor(private ribbonService: BreadcrumbsService) {}

    changeView(view: string) {
      this.ribbonService.setView(view); // Cambia la vista seleccionada
    }
}
