import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit{
  usereditForm!: FormGroup

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onsubmitUser():void{
  
  }

}


