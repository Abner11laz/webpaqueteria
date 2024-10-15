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
  custselectedId: number = 0;
  constructor(private breadCrumbService: BreadcrumbsService, private customerService:CustomerService){}
  
  ngOnInit(): void {
    this.breadCrumbService.setBreadcrumbVisibility(true);
    this.customerService.getCustomers().subscribe((response)=>{
      this.clientes = response;
      console.log("Data de clientes: ", this.clientes);
      this.notisLoading = true;
    },
  (error)=>{
    console.log("error: ", error);
    this.notisLoading = true;
  });
  }


  selectedCustomer: number = 0;
  asideVisible = false;

  showDetails(customerId: number) {
   console.log("Cliente seleccionado desde vista: ", customerId);
    this.asideVisible = true;
    this.selectedCustomer = customerId;
    this.breadCrumbService.setselectedCust(customerId)
  }

  hideDetails() {
    this.asideVisible = false;
  }

}
