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

  login(logData: any): Observable<any> {
    const headers = new HttpHeaders({ 'content-type': 'application/json' });

    return this.http.post<any>(this.apiUrl, logData, { headers }).pipe(
      tap(response => {
        if (response.usuarioID > 0) {
          this.setSession(response);  // Pasamos toda la respuesta para guardar el nombre
        }
      })
    );
  }

 private setSession(response: any) {
  const now = new Date();
  now.setTime(now.getTime() + (5 * 60 * 1000)); // Expira en 5 minutos
  const expira = "expires=" + now.toUTCString();

  document.cookie = `usuario=${response.correo}; ${expira}; path=/`;

  // Guardar también el nombre del usuario en localStorage
  localStorage.setItem('nombreUsuario', response.nombre);
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
