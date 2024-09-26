import { Component } from '@angular/core';
import { NgFor } from '@angular/common'; // Asegúrate de importar NgFor
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports:[NgFor,RouterModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {
  clientes = [
    { nombre: 'Cliente 1', email: 'cliente1@email.com' },
    { nombre: 'Cliente 2', email: 'cliente2@email.com' },
    // Agrega más clientes aquí
  ];
}
