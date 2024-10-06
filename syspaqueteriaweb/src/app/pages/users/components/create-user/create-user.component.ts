import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreadcrumbsService } from '../../../../services/breadcrumbs.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit{
  userForm!:FormGroup
constructor(private fb:FormBuilder, private ribbonService:BreadcrumbsService, private http: HttpClient, private router:Router){
  this.userForm = this.fb.group({
    Nombre:['',Validators.required],
    Apellido:['', Validators.required],
    Correo:['', [Validators.required, Validators.email]],
    Contraseña:['', Validators.required],
    Telefono:['',Validators.pattern('[2-7]{1}[0-9]{7}')],
    Direccion:[''],
    RolID:[''],
    Accion:[''],
    Estado:['A']

  });

}
ngOnInit(): void {
  
  

  this.ribbonService.setBreadcrumbVisibility(false);

}



onsubmitUser(): void{
  if (this.userForm.valid) {
    const userData = this.userForm.value;
    console.log('Datos enviados:', userData);
    this.http.post('http://54.227.145.10/api/usuario/crea-usuario', userData,
      {headers:{'Content-Type':'application/json'}}
    )
      .subscribe({
        next: (response) => {
          console.log('Usuario creado con éxito:', response);
          this.router.navigate(['/users']);
          // Aquí puedes manejar la respuesta del servidor, como mostrar un mensaje de éxito
        },
        error: (error) => {
          console.error('Error al crear el usuario:', error);
          // Aquí puedes manejar el error, como mostrar un mensaje de error
        }
      });
  } else {
    // Aquí se puede mostrar un mensaje de advertencia si el formulario no es válido
    this.userForm.markAllAsTouched(); // Marca todos los controles como 'tocados' para mostrar los errores
    console.log('El formulario no es válido');
  }
}

}
