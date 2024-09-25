import { Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { ProductsComponent } from './products/products.component';
import { SalesComponent } from './sales/sales.component';
import { SalescreditmemoComponent } from './salescreditmemo/salescreditmemo.component';
import { DeliverypackagesComponent } from './deliverypackages/deliverypackages.component';

export const routes: Routes = [
  { path: 'clientes', component: ClientesComponent },
  { path: 'productos', component: ProductsComponent },
  { path: 'ventas', component: SalesComponent },
  { path: 'notas-credito', component: SalescreditmemoComponent },
  { path: 'entrega-paquetes', component: DeliverypackagesComponent },
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },  // Redirección por defecto
  { path: '**', redirectTo: '/clientes' }  // Redirección para rutas no encontradas
];