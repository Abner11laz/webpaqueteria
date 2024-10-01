import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { Router } from '@angular/router';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

menuItem?:any[];
constructor(private sideBarServices: SidebarService, private router:Router, private ribbonService: BreadcrumbsService) {
  this.menuItem = this.sideBarServices.menu;
}
changeView(view: string) {
  this.ribbonService.setView(view); // Cambia la vista seleccionada
}
ngOnInit(): void {
  
}
}
