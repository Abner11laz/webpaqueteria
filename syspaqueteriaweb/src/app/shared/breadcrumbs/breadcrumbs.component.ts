import { Component } from '@angular/core';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css'
})
export class BreadcrumbsComponent {
  showBreadcrumb: boolean = true;
  currentView: string = 'Dashboard'; // Vista inicial
  activeTab: string = 'manage'; // Pestaña activa inicial
  selectedUser: number = 0;

  constructor(private ribbonService: BreadcrumbsService, private route: ActivatedRoute, private router: Router) {}

  navigateToCreateCustomer() {
    this.router.navigate(['./customers/create-customer'], { relativeTo: this.route });
  }

  navigateToCreateUser() {
    this.router.navigate(['./users/create-user'], { relativeTo: this.route });
  }

  navigateToCreateProducts() {
    this.router.navigate(['./products/create'], { relativeTo: this.route });
  }

  ngOnInit(): void {
    this.ribbonService.currentView$.subscribe(view => {
      this.currentView = view;
      this.activeTab = 'manage'; // Cambia la pestaña activa cuando cambia la vista
    });

    this.ribbonService.breadcrumbVisibility$.subscribe(visible => {
      this.showBreadcrumb = visible;
    });

    this.ribbonService.selectedUser$.subscribe(user => {
      this.selectedUser = user;
    });

    // Navegación específica para ventas
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.router.url.includes('/dashboard/sales')) {
          this.currentView = 'Ventas'; // Setea la vista a "Ventas"
        }
      });
  }

  editarProducto() {
    if (this.selectedUser > 0) {
      console.log('Editando usuario: ', this.selectedUser);
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
