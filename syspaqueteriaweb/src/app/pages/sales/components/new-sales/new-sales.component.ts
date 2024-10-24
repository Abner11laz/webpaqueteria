import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-new-sales',
  templateUrl: './new-sales.component.html',
  styleUrl: './new-sales.component.css'
})
export class NewSalesComponent implements OnInit {


  salesOrder: any = {}; // Tu modelo de la orden de ventas
  customers: any[] = []; // Listado de clientes
  typeahead = new Subject<string>(); // Para manejar el evento de búsqueda en el select

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Configura el comportamiento del typeahead (buscador en el select)
    this.typeahead.pipe(
      debounceTime(300),  // Espera 300ms después del último input
      distinctUntilChanged(),
      switchMap(term => this.searchCustomers(term)) // Llama a la API de búsqueda
    ).subscribe(customers => this.customers = customers); // Actualiza la lista de clientes
  }

  // Método para obtener clientes desde la API
  searchCustomers(term: string): Observable<any[]> {
    if (!term.trim()) {
      return this.http.get<any[]>('http://54.227.145.10/api/cliente/listar-todo'); // Aquí coloca la URL de tu API
    }
    return this.http.get<any[]>(`https://api.example.com/customers?search=${term}`);
  }

  // Maneja la selección de cliente
  onCustomerSelect(customer: any) {
    console.log('Customer selected:', customer);
  }


  currentDate: string = '';

  sellToCustomerNo: string = '';
  postingDate: string = '';
  sellToContact: string = '';
  documentDate: string = '';
  sellToCustomerName: string = '';
  externalDocumentNo: string = '';
  sellToAddress: string = '';
  salespersonCode: string = '';

  // Detalle
  lines = [
    { type: '', no: '', description: '', quantity: 0, unitPrice: 0, lineAmount: 0 },
    // Puedes agregar más líneas o inicializarlas vacías
  ];
  items: any[] = []; // Lista completa de productos
  filteredItems: any[] = []; // Productos filtrados en tiempo real

}
