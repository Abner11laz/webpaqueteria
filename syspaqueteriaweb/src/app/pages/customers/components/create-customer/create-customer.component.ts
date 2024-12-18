import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreadcrumbsService } from '../../../../services/breadcrumbs.service';
import { CustomerService } from '../../../../services/customer.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html'
})
export class CreateCustomerComponent implements OnInit {
  customerForm!: FormGroup;
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });


  constructor(private fb: FormBuilder, private breadcrumbService:BreadcrumbsService, private customerService:CustomerService, private router:Router){}
  ngOnInit(): void {
    this.customerForm = this.fb.group({
      clienteID:[null],
      codigoCliente:[''],
      nombresCliente:['',Validators.required], //Para nombre de cliente a facturar
      apellidosCliente:['', Validators.required], //Para nombre de comercio
      estadoCliente:['', Validators.required], // EstadoCliente
      telefonoCliente:['', Validators.required],
      correoCliente:['', Validators.required],
      direccionCliente:['', Validators.required], //Para direccion de cliente
      municipio:['',Validators.required], //Para ciudad o Municipio = Municipio
      //postCode:['',Validators.required], //Para codigo Postal
      departamento:['', Validators.required], //Para País o region = Departamento
      nIT: ['', Validators.required],
      categoriaCliente:['', Validators.required],
      accion:['', Validators.required]

    });

    this.breadcrumbService.setBreadcrumbVisibility(false);
    }
    onSubmit(): void {

      if(this.customerForm.valid){
        console.log("Formulario valido");
        const customerdataForm = this.customerForm.value;
        this.customerService.setCustomer(customerdataForm).subscribe((response:any)=>{

            console.log("Cliente registrado con exito");
            this.router.navigate(['dashboard/customers']);


        },
      (error)=>{
        console.log("Error al crear el cliente ", error);
      });
      }else{
        console.log("Formulario no valido");
        this.customerForm.markAllAsTouched();
        Object.keys(this.customerForm.controls).forEach(controlName => {
          const control = this.customerForm.get(controlName);
          if (control && control.invalid) {
              console.log(`Control '${controlName}' no válido. Errores:`, control.errors);
          }
      });
      }

  }

}
