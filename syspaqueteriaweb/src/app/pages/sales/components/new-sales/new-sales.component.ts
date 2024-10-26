import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, Observable, startWith, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-new-sales',
  templateUrl: './new-sales.component.html',
  styleUrl: './new-sales.component.css'
})
export class NewSalesComponent implements OnInit {

  salesOrderForm!: FormGroup; // Eliminamos el `?` para asegurar que siempre esté definido
  salesOrder: any = {};
  customers: any[] = [];
  products: any[] = [];
  typeahead = new Subject<string>(); // Sujeto para manejar el texto de búsqueda

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit(): void {
  
    this.salesOrderForm = this.fb.group({
      nombresCliente: ['', Validators.required],
      codigoCliente: ['', Validators.required],
      nit: ['', Validators.required],
      direccionCliente: ['', Validators.required],
      telefonoCliente: ['', Validators.required],
      correoCliente: ['', Validators.required],
      categoriaCliente: ['', [Validators.required, Validators.email]],
      departamento: ['', Validators.required],
      municipio: ['', Validators.required],
      TipoVenta: ['', Validators.required],
      FechaVenta: ['', Validators.required],
      TotalVenta: ['', Validators.required],
      status: ['open', Validators.required],
      lines: this.fb.array([
        this.createLines()
      ]) // Array para las líneas de venta
    });

    this.loadAllCustomers();

    this.typeahead.pipe(
      startWith(''),  
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.searchCustomers(term))
    ).subscribe(customers => this.customers = customers);
  }

  createLines(): FormGroup {
    return this.fb.group({
      type: '',
      no: '',
      description: '',
      quantity: 0,
      unitPrice: 0,
      lineAmount: 0
    });
  }

  // Obtener el FormArray `lines`
  get lines(): FormArray {
    return this.salesOrderForm.get('lines') as FormArray;
  }
 
  // Cargar todos los clientes al inicio
  loadAllCustomers() {
    this.http.get<any[]>('http://54.227.145.10/api/cliente/listar-todo')
      .pipe(
        map(customers => customers.map(customer => ({
          ...customer,
          fullName: customer.codigoCliente + ' - ' + customer.nombresCliente + ' ' + customer.apellidosCliente
        })))
      ).subscribe(customers => this.customers = customers);
  }


  loadAllProducts() {
    this.http.get<any[]>('http://54.227.145.10/api/producto/listar-todo')
      .pipe(
        map(products => products.map(product => ({
          ...product,
         
        })))
      ).subscribe(products => this.products = products);
  }

 

  // Buscar clientes por término
  searchCustomers(term: string): Observable<any[]> {
    return this.http.get<any[]>('http://54.227.145.10/api/cliente/listar-todo')
      .pipe(
        map(customers => customers.map(customer => ({
          ...customer,
          fullName: customer.codigoCliente + ' - ' + customer.nombresCliente + ' ' + customer.apellidosCliente
        }))),
        map(customers =>
          // Filtrar clientes si hay un término de búsqueda
          customers.filter(customer => customer.fullName.toLowerCase().includes(term.toLowerCase()))
        )
      );
  }

  onCustomerSelect(customer: any) {
    if (customer != null) {
      const custSelect = this.customers.find(c => c.codigoCliente == customer.codigoCliente);

      if (custSelect) {
        this.salesOrderForm.patchValue({
          nombresCliente: custSelect.nombresCliente,
          nit: custSelect.nit,
          direccionCliente: custSelect.direccionCliente,
          telefonoCliente: custSelect.telefonoCliente,
          correoCliente: custSelect.correoCliente,
          categoriaCliente: custSelect.categoriaCliente,
          departamento: custSelect.departamento,
          municipio: custSelect.municipio,
          TipoVenta: custSelect.TipoVenta,
          FechaVenta: custSelect.FechaVenta,
        });
      }
    }
    console.log('Customer selected:', customer);
  }

  onsubmitSale(): void { }

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
  items: any[] = []; // Lista completa de productos
  filteredItems: any[] = []; // Productos filtrados en tiempo real

  addLine(): void {
    const lineForm = this.fb.group({
      codigoCliente: ['', Validators.required],
      locationCode: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitOfMeasure: ['', Validators.required]
    });
    this.lines.push(lineForm); // Agregamos una línea al FormArray
  }

}
