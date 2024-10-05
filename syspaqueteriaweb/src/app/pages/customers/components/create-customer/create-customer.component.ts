import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.css'
})
export class CreateCustomerComponent implements OnInit {
  customerForm!: FormGroup;

  constructor(private fb: FormBuilder){}
  ngOnInit(): void {
    this.customerForm = this.fb.group({
      customerNo:['', Validators.required],
      nameBilling:['',Validators.required],
      nameInternal:[''],
      nameTrading:[''],
      address:['', Validators.required],
      city:['',Validators.required],
      postCode:['',Validators.required],
      countryRegion:['', Validators.required]
      
    });
   
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
