import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SuppliersService } from '../../../../services/suppliers.service';

@Component({
  selector: 'app-create-suppliers',
  templateUrl: './create-suppliers.components.html'
})
export class CreateSuppliersComponent {

  proveedor = {
    nombre: '',
    telefono: '',
    direccion: '',
    correo: ''
  };

  constructor(private suppliersService: SuppliersService, private router: Router) {}

  onSubmit(): void {
    if (this.proveedor.nombre && this.proveedor.telefono && this.proveedor.direccion && this.proveedor.correo) {
      const proveedorData = {
        nombre: this.proveedor.nombre,
        telefono: this.proveedor.telefono,
        direccion: this.proveedor.direccion,
        correo: this.proveedor.correo
      };

      this.suppliersService.createOrUpdateSupplier(proveedorData).subscribe(
        response => {
          console.log('Proveedor guardado con éxito', response);
          this.router.navigate(['/dashboard/suppliers']);
        },
        error => {
          console.error('Error al guardar el proveedor', error);
        }
      );
    }
  }
}
