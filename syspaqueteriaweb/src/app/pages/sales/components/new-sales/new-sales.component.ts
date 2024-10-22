import { Component } from '@angular/core';

@Component({
  selector: 'app-new-sales',
  templateUrl: './new-sales.component.html',
  styleUrl: './new-sales.component.css'
})
export class NewSalesComponent {
  salesOrder = {
    sellToCustomerNo: '10001',
    sellToContactNo: 'CT00007',
    sellToCustomerName: 'The Cannon Group PLC',
    sellToAddress: '192 Market Square',
    sellToCity: 'Birmingham',
    sellToPostCode: 'B27 4KT',
    sellToContact: 'Mr. Andy Teal',
    orderDate: '2017-01-26',
    salespersonCode: 'PS',
    campaignNo: '',
    responsibilityCenter: 'BIRMINGHAM',
    status: 'open',
    lines: [
      { no: '1', description: 'Item 1', locationCode: '', quantity: 10, unitOfMeasure: 'pcs' },
      { no: '2', description: 'Item 2', locationCode: '', quantity: 5, unitOfMeasure: 'pcs' }
    ],
    invoiceDiscountAmount: 0,
    totalExclVAT: 0,
    totalVAT: 0,
    totalInclVAT: 0
  };




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
