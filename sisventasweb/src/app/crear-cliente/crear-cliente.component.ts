import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-crear-cliente',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './crear-cliente.component.html',
  styleUrl: './crear-cliente.component.css'
})
export class CrearClienteComponent {
  cliente = {
    codigo: '',
    nombres: '',
    apellidos: '',
    nit: '',
    direccion: '',
    categoria: '',
    estado: '1'
  };

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Formulario válido', this.cliente);
      // Aquí puedes agregar la lógica para enviar los datos o hacer otra acción
    } else {
      console.log('Formulario no válido');
    }
  }
}
