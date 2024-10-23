import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbsService } from '../../../../services/breadcrumbs.service';

@Component({
  selector: 'app-home-sales',
  templateUrl: './home-sales.component.html',
  styleUrl: './home-sales.component.css'
})
export class HomeSalesComponent {
  currentView: string = 'Dashboard'; // Vista inicial
  activeTab: string = 'manage'; // Pestaña activa inicial
  constructor(private router: Router,private route:ActivatedRoute, private ribbonservice:BreadcrumbsService){}

  setActiveTab(tab: string) {
    this.activeTab = tab;
    this.ribbonservice.setBreadcrumbVisibility(false);
  }

  navigateToCreateSales():void{
    this.router.navigate(['./new-sales'], { relativeTo: this.route });
  }

}
