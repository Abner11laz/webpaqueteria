import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CustomersComponent } from './customers/customers.component';
import { CreateCustomerComponent } from './customers/components/create-customer/create-customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './customers/components/home/home.component';  // Asegúrate de importar esto

@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    ProductsComponent,
    PagesComponent,
    CustomersComponent,
    CreateCustomerComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports:[
    DashboardComponent,
    UsersComponent,
    ProductsComponent,
    CustomersComponent,
    CreateCustomerComponent
   
  ]
})
export class PagesModule { }
