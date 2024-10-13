import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUriApi = 'http://54.227.145.10/api/cliente'
  constructor(private httpClient: HttpClient) { }

  getCustomers():Observable<any>{
    return this.httpClient.get(`${this.baseUriApi}/listar-todo`);
  }


 

  setCustomer(customerData:any):Observable<any>{
    return this.httpClient.post(`${this.baseUriApi}/crud`,customerData);

  }

  searchCus(cusId:number):Observable<any>{

    return this.httpClient.get(`${this.baseUriApi}/leer/${cusId}`)
  }
}
