import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUriApi = 'http://54.227.145.10/api/cliente'
  constructor(private httpClient: HttpClient) { }

  setCustomer(customerData:any):Observable<any>{
    return this.httpClient.post(`${this.baseUriApi}/crud`,customerData);

  }
}
