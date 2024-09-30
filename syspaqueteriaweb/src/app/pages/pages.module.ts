import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CustomersComponent } from './customers/customers.component';



@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    ProductsComponent,
    PagesComponent,
    CustomersComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports:[
    DashboardComponent,
    UsersComponent,
    ProductsComponent,
    CustomersComponent
   
  ]
})
export class PagesModule { }
