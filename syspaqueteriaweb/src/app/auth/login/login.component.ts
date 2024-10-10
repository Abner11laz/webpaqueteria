import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  correo: string = '';
  contraseña: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private formb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.loginForm = this.formb.group({
      correo: ['', Validators.required],
      contraseña: ['', Validators.required],
    });
  }

  onSubmilogin(): void {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
    
      this.authService.login(loginData).subscribe({
        next: (response) => {
         
          if (response.usuarioID > 0) {
            this.router.navigate(['dashboard']);
          } else {
            this.errorMessage = 'Correo o contraseña incorrectos';
          }
        },
        error: (err) => {
          console.log('Error en el login', err);
          this.errorMessage = 'Hubo un error, intenta nuevamente';
        },
      });
    }
    //alert("hola");
  }
}
