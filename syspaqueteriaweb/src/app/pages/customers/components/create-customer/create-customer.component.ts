import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreadcrumbsService } from '../../../../services/breadcrumbs.service';
import { CustomerService } from '../../../../services/customer.service';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.css'
})
export class CreateCustomerComponent implements OnInit {
  customerForm!: FormGroup;

  constructor(private fb: FormBuilder, private breadcrumbService:BreadcrumbsService, private customerService:CustomerService, private router:Router){}
  ngOnInit(): void {
    this.customerForm = this.fb.group({
     
      nombresCliente:['',Validators.required], //Para nombre de cliente a facturar
     
      apellidosCliente:[''], //Para nombre de comercio
      estadoCliente:[''], // EstadoCliente
      telefonoCliente:[''],
      correoCliente:[''],
      direccionCliente:['', Validators.required], //Para direccion de cliente
      municipio:['',Validators.required], //Para ciudad o Municipio = Municipio
      postCode:['',Validators.required], //Para codigo Postal
      departamento:['', Validators.required], //Para País o region = Departamento
      nIT: [''],
      categoriaCliente:['']
      
    });
    
    this.breadcrumbService.setBreadcrumbVisibility(false);
    }
    onSubmit(): void {
      if(this.customerForm.valid){
        const customerdataForm = this.customerForm.value;
        this.customerService.setCustomer(customerdataForm).subscribe((response)=>{
          console.log("Cliente registrado con exito");
          this.router.navigate(['dashboard/customers']);
        },
      (error)=>{
        console.log("Error al crear el cliente ", error);
      });
      }else{
        alert('Rellena los campos requeridos');
      }
   
  }

}
