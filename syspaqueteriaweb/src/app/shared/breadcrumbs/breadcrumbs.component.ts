import { Component } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css'
})
export class BreadcrumbsComponent {
  activeTab: string = 'manage'; // La pestaña por defecto es 'manage'

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
