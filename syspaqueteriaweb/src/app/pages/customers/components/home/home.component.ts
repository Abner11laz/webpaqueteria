import { Component, OnInit } from '@angular/core';
import { BreadcrumbsService } from '../../../../services/breadcrumbs.service';
import { CustomerService } from '../../../../services/customer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  clientes:any[]=[];

  constructor(private breadCrumbService: BreadcrumbsService, private customerService:CustomerService){}
  ngOnInit(): void {
    this.breadCrumbService.setBreadcrumbVisibility(true);
    this.customerService.getCustomers().subscribe((response)=>{
      this.clientes = response;
    },
  (error)=>{
    console.log("error: ", error);
  });
  }


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
