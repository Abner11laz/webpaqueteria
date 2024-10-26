import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  codigoCliente: number = 0;
  constructor(private http: HttpClient, private fb: FormBuilder,private router:Router) { }

  ngOnInit(): void {
  
    this.salesOrderForm = this.fb.group({
      clienteID:[0],
      nombresCliente: ['', Validators.required],
      codigoCliente: [0, Validators.required],
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
    this.loadAllProducts();
    this.typeahead.pipe(
      startWith(''),  
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.searchCustomers(term))
    ).subscribe(customers => this.customers = customers);
  }

  createLines(): FormGroup {
    return this.fb.group({
      productoID: '',
      codigoProducto: '',
      descripcion: '',
      quantity: 0,
      precio: 0,
      existenciaMinima: 0,
      total:0
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
          fullDescription: product.codigoProducto + ' - ' + product.descripcion
         
        })))
      ).subscribe(products => {this.products = products;
        console.log(this.products); // Imprime los productos en la consola
  });
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
      const custSelect = this.customers.find(c => c.clienteID == customer.clienteID);

      if (custSelect) {
        this.codigoCliente = custSelect.codigoCliente;
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

  onProductSelect(product:any,lineIndex: number){
    const productFind = this.products.find(pr => pr.productoID== product.productoID);
    console.log("Index de linea: " + lineIndex);
    if(productFind){
      const lineGroup = this.lines.at(lineIndex) as FormGroup
      console.log("Lineas de tabla: ",lineGroup);

      lineGroup.patchValue({
        descripcion: productFind.descripcion,
        precio: productFind.precio, // Suponiendo que tienes un campo `precioUnitario` en la API
        existenciaMinima: productFind.existenciaMinima
      });


    }
  }

  updateLineAmount(lineIndex: any):void{

    const lineGroup = this.lines.at(lineIndex) as FormGroup;
    const unitPrice = lineGroup.value.precio || 0;
    const quantity = lineGroup.value.quantity || 1;
  
    lineGroup.patchValue({
      total:unitPrice * quantity

    });

    const total = this.lines.controls.reduce((sum, lineGroup) => {
      const lineAmount = lineGroup.value.total || 0;
      return sum + lineAmount;
    }, 0);
  
    // Actualizamos el TotalVenta en el formulario principal
    this.salesOrderForm.patchValue({
      TotalVenta: total
    });
   
  }
  onsubmitSale(): void {
    const saleData = {
      ClienteID: this.salesOrderForm.value.clienteID,
      TipoVenta: this.salesOrderForm.value.TipoVenta,
      FechaVenta: this.salesOrderForm.value.FechaVenta,
      TotalVenta: this.salesOrderForm.value.TotalVenta,
      Estado: "A",
      DetalleVenta: this.lines.controls.map(line => ({
        ProductoID: line.value.productoID,
        Cantidad: line.value.quantity
      }))
    };
  console.log("data de venta a enviar: ", saleData);
   
    this.http.post('http://54.227.145.10/api/venta/registrar', saleData)
      .subscribe(
        response => {
          this.router.navigate(['dashboard/sales']);
          console.log('Venta registrada exitosamente:', response);
   
        },
        error => {
          console.error('Error al registrar la venta:', error);

        }
      );
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
  items: any[] = []; // Lista completa de productos
  filteredItems: any[] = []; // Productos filtrados en tiempo real

  addLine(): void {
    const lineForm = this.fb.group({
      productoID: ['', Validators.required],
      codigoProducto:['', Validators.required],
      descripcion:  ['', [Validators.required]],
      quantity:  [1, [Validators.required, Validators.min(1)]],
      precio:  [1, [Validators.required, Validators.min(1)]],
      existenciaMinima:  [1, [Validators.required, Validators.min(1)]],
      total:[1,[Validators.required, Validators.min(1)]]
    });
    this.lines.push(lineForm); // Agregamos una línea al FormArray
  }

}
