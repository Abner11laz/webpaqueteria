import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  productsData =[
    {id:1,Name:'Banano', price:3.20, stock:12},
    {id:2, Name:'Manzana roja',price:4.10, stock:6}
  ];
  selectedUser:any;
  selectUser(user:any){
   this.selectedUser=user;
  }
}
