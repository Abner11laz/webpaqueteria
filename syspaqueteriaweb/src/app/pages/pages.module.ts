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
import { HomeComponent } from './customers/components/home/home.component';
import { CreateUserComponent } from './users/components/create-user/create-user.component';
import { HomeUserComponent } from './users/components/home-user/home-user.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    ProductsComponent,
    PagesComponent,
    CustomersComponent,
    CreateCustomerComponent,
    HomeComponent,
    CreateUserComponent,
    HomeUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    
  ],
  providers:[
    provideHttpClient(withFetch())
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
