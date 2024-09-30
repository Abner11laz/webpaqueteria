import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

menuItem?:any[];
constructor(private sideBarServices: SidebarService, private router:Router) {
  this.menuItem = this.sideBarServices.menu;
}
ngOnInit(): void {
  
}
}
