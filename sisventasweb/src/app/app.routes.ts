import { Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { ProductsComponent } from './products/products.component';
import { SalesComponent } from './sales/sales.component';
import { SalescreditmemoComponent } from './salescreditmemo/salescreditmemo.component';
import { DeliverypackagesComponent } from './deliverypackages/deliverypackages.component';
import { CrearClienteComponent } from './crear-cliente/crear-cliente.component';

export const routes: Routes = [
  { path: 'clientes', component: ClientesComponent },
  { path: 'productos', component: ProductsComponent },
  { path: 'ventas', component: SalesComponent },
  { path: 'notas-credito', component: SalescreditmemoComponent },
  { path: 'entrega-paquetes', component: DeliverypackagesComponent },
  { path: 'crear-cliente', component: CrearClienteComponent },
  { path: '', redirectTo: '/productos', pathMatch: 'full' },  // Redirección por defecto
  { path: '**', redirectTo: '/productos' }  // Redirección para rutas no encontradas
  
];