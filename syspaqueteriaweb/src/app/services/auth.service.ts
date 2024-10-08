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

  login(correo: string, pass: string): Observable<any>{
    const body = {
      correo: correo,
      contraseña: pass
    };

    const headers = new HttpHeaders({'content-type':'application/json'});

    return this.http.post<any>(this.apiUrl, body,{headers}).pipe(
      tap(response => {
        if(response.usuarioID >0){
          this.setSession(response.correo);
        }
      })
    );
  }
  private setSession(correo: string){
    localStorage.setItem('user',correo);
  }
  isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
