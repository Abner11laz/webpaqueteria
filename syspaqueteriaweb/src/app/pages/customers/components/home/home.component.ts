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
  notisLoading:boolean = false;
  constructor(private breadCrumbService: BreadcrumbsService, private customerService:CustomerService){}
  
  ngOnInit(): void {
    this.breadCrumbService.setBreadcrumbVisibility(true);
    this.customerService.getCustomers().subscribe((response)=>{
      this.clientes = response;
      this.notisLoading = true;
    },
  (error)=>{
    console.log("error: ", error);
    this.notisLoading = true;
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
