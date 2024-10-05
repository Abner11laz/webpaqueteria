import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { CreateCustomerComponent } from './customers/components/create-customer/create-customer.component';
import { HomeComponent } from './customers/components/home/home.component';

const routes: Routes=[
  {path: 'dashboard', component: PagesComponent,
    children:[
      {path:'',component: DashboardComponent},
      {path:'users', component:UsersComponent},
      {path:'products', component:ProductsComponent},
      {path:'customers', component:CustomersComponent,
        children: [
          { path: '', component: HomeComponent },
          { path: 'create-customer', component: CreateCustomerComponent }
        ]
      },
    ]
   },
   
  
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class PagesRoutingModule { }
