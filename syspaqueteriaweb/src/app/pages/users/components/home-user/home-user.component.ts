import { Component, OnInit } from '@angular/core';
import { BreadcrumbsService } from '../../../../services/breadcrumbs.service';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrl: './home-user.component.css'
})
export class HomeUserComponent implements OnInit {

  constructor(private ribbonService: BreadcrumbsService){}
  ngOnInit(): void {
    this.ribbonService.setBreadcrumbVisibility(true);
  }
selectedUser: any = null;
  users = [
    {id:1, name:'Abner', lastName: 'Ruano', email:'aruanol@miumg.edu.gt', rol:'Admin'},
     {id:2, name:'Jonhatan', lastName: 'Ixchen', email:'jixchen@miumg.edu.gt', rol:'Admin'}
  ];

    selectUser(user:any){
      this.selectedUser  = user;
      console.log("usuario: ", user);
      this.ribbonService.setSelectedUser(user);
    }

}
