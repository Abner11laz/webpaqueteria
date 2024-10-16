import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { BreadcrumbsService } from '../../../../services/breadcrumbs.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit{
  usereditForm!: FormGroup;
  nuserId: number =0;

  constructor(private fb:FormBuilder, private userService:UserService, private ribbonService: BreadcrumbsService, private router:Router, private route:ActivatedRoute ){
    this.usereditForm = this.fb.group({

      nombre:['',Validators.required],
      apellido:['', Validators.required],
      correo:['', [Validators.required, Validators.email]],
      contraseña:['', Validators.required],
      telefono:['',Validators.pattern('[2-7]{1}[0-9]{7}')],
      direccion:['',Validators.required],
      rolID:['',Validators.required],
      accion:['', Validators.required],
      estado:['A'],
      usuarioID:['',Validators.required]
    });

  }

  ngOnInit(): void {
    this.ribbonService.setBreadcrumbVisibility(false);
    this.nuserId = Number(this.route.snapshot.paramMap.get('idUser'));
    if(this.nuserId >0){
      this.userService.getUsers(this.nuserId).subscribe((user)=>{
        console.log("Data Usuario: ",user);
        this.usereditForm.patchValue({
          usuarioID: this.nuserId,
          nombre: user.nombre,
          apellido: user.apellido,
          correo:user.correo,
          contraseña:user.contraseña,
          telefono:user.telefono,
          direccion:user.direccion,
          rolID:user.rolID,
          accion:user.Accion,
          estado:user.estado

        });
      },
    (error)=>{

    });
    }

  }

  onsubmiteditUser():void{
  if(this.usereditForm.valid){
      const userData = this.usereditForm.value;
      console.log("Data a enviar: ",userData);
      
      this.userService.setUser(userData).subscribe((response)=>{
        this.router.navigate(['dashboard/users']);
      },
    (error)=>{
      console.log("Ocurrio un error al actualizar el usuario: ",error);
    });
  }else{
    console.log("La indormacion del formulario no es valida ",this.getInvalidFields(this.usereditForm));
  }
  }

  getInvalidFields(formGroup: FormGroup): { [key: string]: any } {
    const invalidFields: { [key: string]: any } = {};
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control && control.invalid) {
        invalidFields[key] = control.errors; // Guardamos el campo junto con sus errores
      }
    });
    return invalidFields;
  }

}


