import { Component } from '@angular/core';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css'
})
export class BreadcrumbsComponent {

  currentView: string = 'Dashboard'; // Vista inicial
  activeTab: string = 'manage'; // Pestaña activa inicial

  constructor(private ribbonService: BreadcrumbsService) {}

  ngOnInit(): void {
    this.ribbonService.currentView$.subscribe(view => {
      this.currentView = view;
      this.activeTab = 'manage'; // Cambia la pestaña activa cuando cambia la vista
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }


  /*activeTab: string = 'manage'; // La pestaña por defecto es 'manage'

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }*/
}
