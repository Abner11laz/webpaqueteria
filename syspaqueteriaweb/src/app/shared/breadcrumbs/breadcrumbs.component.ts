import { Component } from '@angular/core';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
//import { Router } from 'express';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css'
})
export class BreadcrumbsComponent {
  showBreadcrumb: boolean = true; 
  currentView: string = 'Dashboard'; // Vista inicial
  activeTab: string = 'manage'; // Pestaña activa inicial

  constructor(private ribbonService: BreadcrumbsService, private route:ActivatedRoute, private router: Router) {}
  navigateToCreateCustomer() {
    this.router.navigate(['./customers/create-customer'], { relativeTo: this.route });
  }

  navigateToCreateUser(){
    this.router.navigate(['./users/create-user'],{relativeTo: this.route})
  }

  ngOnInit(): void {

    this.ribbonService.currentView$.subscribe(view => {
      this.currentView = view;
      console.log("Desde breadcrumbs component ts ->",view);
      this.activeTab = 'manage'; // Cambia la pestaña activa cuando cambia la vista

     

    });
    this.ribbonService.breadcrumbVisibility$.subscribe(visible=>{
      this.showBreadcrumb = visible;
      console.log("mostrar breadcrubs: ", this.showBreadcrumb);
    });

    
/*
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.showBreadcrumb = !this.router.url.includes('/dashboard/customers/create-customer');
    });
    */
   
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }


  /*activeTab: string = 'manage'; // La pestaña por defecto es 'manage'

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }*/
}
