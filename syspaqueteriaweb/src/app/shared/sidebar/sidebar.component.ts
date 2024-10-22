import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { Router } from '@angular/router';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'] // Corregido el typo (styleUrl -> styleUrls)
})
export class SidebarComponent implements OnInit {
  showBreadcrumb: boolean = true;
  menuItem?: any[];
  nombreUsuario: string = ''; // Nueva propiedad para almacenar el nombre del usuario logueado

  constructor(
    private sideBarServices: SidebarService,
    private router: Router,
    private ribbonService: BreadcrumbsService
  ) {
    this.menuItem = this.sideBarServices.menu;
  }

  // Método para cambiar la vista
  changeView(view: string) {
    this.ribbonService.setView(view); // Cambia la vista seleccionada
  }

  ngOnInit(): void {
    // Recuperar el nombre del usuario desde localStorage
    this.nombreUsuario = localStorage.getItem('nombreUsuario') || 'Admin';  // Si no existe, se muestra "Admin" por defecto

    // Suscribirse a la visibilidad del breadcrumb
    this.ribbonService.breadcrumbVisibility$.subscribe((visible) => {
      this.showBreadcrumb = visible;
    });
  }
}
