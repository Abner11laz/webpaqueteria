import { Component, OnInit } from '@angular/core';
import { BreadcrumbsService } from '../../../../services/breadcrumbs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor(private breadCrumbService: BreadcrumbsService){}
  ngOnInit(): void {
    this.breadCrumbService.setBreadcrumbVisibility(true);
  }

  

  clientes=[
    { id: 1, name: 'Juan Perez', email: 'juanperez@example.com', phone: '555-1234', invoices: 5, openOrders: 2, cancellations: 1 },
    { id: 2, name: 'Maria Gomez', email: 'mariagomez@example.com', phone: '555-5678', invoices: 10, openOrders: 3, cancellations: 0 }
  ];

  selectedCustomer: any = null;
  asideVisible = false;

  showDetails(customer: any) {
    this.selectedCustomer = customer;
    this.asideVisible = true;
  }

  hideDetails() {
    this.asideVisible = false;
  }
}
