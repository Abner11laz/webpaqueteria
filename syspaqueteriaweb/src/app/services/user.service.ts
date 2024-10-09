import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private  endpointUri = 'http://54.227.145.10/api/usuario/listar-todos';

  constructor(private httpclient: HttpClient) { }

  getUser():Observable<any>{
    return this.httpclient.get<any>(this.endpointUri);
  }
}
