import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreadcrumbsService } from '../../../../services/breadcrumbs.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { error } from 'console';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit{
  userForm!:FormGroup
constructor(private fb:FormBuilder, private ribbonService:BreadcrumbsService, private http: HttpClient, private router:Router, private userService: UserService){
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
    this.userService.setUser(userData).subscribe((response)=>{
        console.log("Usuario Insertado correctamente");
        this.router.navigate(['dashboard/users']);
    },
  (error)=>{
    console.log("Error al insertar los datos ", error);
  });
   
  } else {
    // Aquí se puede mostrar un mensaje de advertencia si el formulario no es válido
    this.userForm.markAllAsTouched(); // Marca todos los controles como 'tocados' para mostrar los errores
    console.log('El formulario no es válido');
  }
}

}
