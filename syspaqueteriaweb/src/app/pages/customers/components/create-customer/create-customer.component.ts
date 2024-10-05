import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreadcrumbsService } from '../../../../services/breadcrumbs.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.css'
})
export class CreateCustomerComponent implements OnInit {
  customerForm!: FormGroup;

  constructor(private fb: FormBuilder, private breadcrumbService:BreadcrumbsService){}
  ngOnInit(): void {
    this.customerForm = this.fb.group({
      customerNo:['', Validators.required], //para codigo de cliente
      nameBilling:['',Validators.required], //Para nombre de cliente a facturar
     
      nameTrading:[''], //Para nombre de comercio
      customerAdress:['', Validators.required], //Para direccion de cliente
      city:['',Validators.required], //Para ciudad o Municipio = Municipio
      postCode:['',Validators.required], //Para codigo Postal
      countryRegion:['', Validators.required], //Para País o region = Departamento
      genBusPostingGroup:[''],
      vatBusPostingGroup:[''],
      vatRegistrationNo: [''],
      creditLimit:[''],
      customerStatus:[''], // EstadoCliente
      
    });
    
    this.breadcrumbService.setBreadcrumbVisibility(false);
    }
    onSubmit(): void {
      if(this.customerForm.valid){
        console.log(this.customerForm.value);
//LLamar a servicio de api para post de clientes
      }else{
        alert('Rellena los campos requeridos');
      }
   
  }

}
