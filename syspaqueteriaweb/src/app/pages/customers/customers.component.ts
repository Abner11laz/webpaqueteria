import { Component } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {
  clientes=[
    {nombre:"Solovino",email:"soporte@hotmail.com"},
    {nombre:"Casemiro",email:"casemiro@madrid.com"}
  ];
}
