import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  // URLs de las API
  private readonly listarProveedoresUrl = 'http://54.227.145.10/api/proveedor/listar-todo';
  private readonly crearProveedorUrl = 'http://54.227.145.10/api/proveedor/crear-o-actualizar';

  constructor(private http: HttpClient) { }

  // Obtener todos los proveedores
  getProveedores(): Observable<any> {
    return this.http.get<any>(this.listarProveedoresUrl);
  }

  // Crear o actualizar un proveedor
  createOrUpdateSupplier(proveedor: any): Observable<any> {
    // Estructura de proveedor para enviar en la solicitud
    const body = {
      proveedorID: proveedor.proveedorID || 0,  // Si es 0, se considera como un nuevo proveedor
      codigoProveedor: proveedor.codigoProveedor || '',
      nombreProveedor: proveedor.nombre,
      telefonoProveedor: proveedor.telefono,
      direccionProveedor: proveedor.direccion,
      correoProveedor: proveedor.correo,
      estado: 'V'  // El estado se asigna como 'V' por defecto
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(this.crearProveedorUrl, body, { headers });
  }
}
