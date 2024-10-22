import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-sales',
  templateUrl: './home-sales.component.html',
  styleUrl: './home-sales.component.css'
})
export class HomeSalesComponent {
  currentView: string = 'Dashboard'; // Vista inicial
  activeTab: string = 'manage'; // Pestaña activa inicial
  constructor(private router: Router,private route:ActivatedRoute){}

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  navigateToCreateSales():void{
    this.router.navigate(['./new-sales'], { relativeTo: this.route });
  }

}
