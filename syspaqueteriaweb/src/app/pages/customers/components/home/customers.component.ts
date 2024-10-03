import { Component } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {
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
