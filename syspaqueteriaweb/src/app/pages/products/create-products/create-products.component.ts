import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html'
})
export class CreateProductsComponent {

  producto = {
    productoID: 0,
    codigoProducto: '',
    descripcion: '',
    codigoProveedor: '',
    fechaVencimiento: '',
    ubicacionFisica: '',
    cantidad: 0,
    precio: 0,
    estado: 'D'
  };

  constructor(private productsService: ProductsService, private router: Router) {}

  onSubmit(): void {
    if (this.producto.descripcion && this.producto.codigoProveedor && this.producto.fechaVencimiento && this.producto.ubicacionFisica && this.producto.cantidad > 0 && this.producto.precio > 0) {
      const productoData = {
        productoID: this.producto.productoID,
        codigoProducto: this.producto.codigoProducto,
        descripcion: this.producto.descripcion,
        codigoProveedor: this.producto.codigoProveedor,
        fechaVencimiento: this.producto.fechaVencimiento,
        ubicacionFisica: this.producto.ubicacionFisica,
        existenciaMinima: this.producto.cantidad,
        estado: this.producto.estado,
        Precio: this.producto.precio
      };

      this.productsService.createOrUpdateProducto(productoData).subscribe(
        response => {
          console.log('Producto guardado con éxito', response);
          this.router.navigate(['/dashboard/products']);
        },
        error => {
          console.error('Error al guardar el producto', error);
        }
      );
    }
  }
}
