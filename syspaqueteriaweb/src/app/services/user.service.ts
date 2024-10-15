import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private  baseapiUri = 'http://54.227.145.10/api/usuario';
  constructor(private httpclient: HttpClient) { }

  getUser():Observable<any>{
    return this.httpclient.get<any>(`${this.baseapiUri}/listar-todos`);
  }
  setUser(userdataForm:any):Observable<any>{
    return this.httpclient.post(`${this.baseapiUri}/crear-o-actualizar`,userdataForm);
  }

}
