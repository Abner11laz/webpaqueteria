import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthResponse } from '../auth/interfaces/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://54.227.145.10/api/usuario/login';

  constructor(private http:HttpClient, private router: Router) { }

  login(logData:any): Observable<any>{
    
    console.log(logData);

    const headers = new HttpHeaders({'content-type':'application/json'});
   
    return this.http.post<any>(this.apiUrl, logData,{headers}).pipe(
      tap(response => {
        if(response.usuarioID >0){
          this.setSession(response.correo);
        }
      })
    );
  }
  private setSession(correo: string){
    const now = new Date();
    console.log("time is: ", now.getTime());
  now.setTime(now.getTime() + (5 *60*1000)); 
    const expira = "expires=" + now.toUTCString();
  document.cookie = `usuario=${correo}; ${expira}; path=/`;

  console.log("Cookie creada: ", document.cookie);
  }
  isLoggedIn(): boolean {
    const cookie = this.getCookie('usuario');
    return cookie !== null;
  }
  private getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }
  logout() {
    this.deleteCookie('usuario');
    this.router.navigate(['/login']);
  }
  
  private deleteCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

}
