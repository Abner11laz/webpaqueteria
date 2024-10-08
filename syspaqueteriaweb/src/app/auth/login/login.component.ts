import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 correo: string = '';
 contraseña: string = '';
 errorMessage: string = '';

 constructor(private authService: AuthService, private router: Router){}

 onSubmit(){
  this.authService.login(this.correo, this.contraseña).subscribe({
    next: (response) => {
      if(response.usuarioID >0){
        this.router.navigate(['/Dashboard']);

      }else{
        this.errorMessage = 'Correo o contraseña incorrectos';
      }
    },
    error: (err)=>{
      console.log('Error en el login', err);
      this.errorMessage = 'Hubo un error, intenta nuevamente';
    }
  });
 }

}
