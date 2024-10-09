import { Component, OnInit } from '@angular/core';
import { BreadcrumbsService } from '../../../../services/breadcrumbs.service';
import { UserService } from '../../../../services/user.service';
import { error } from 'console';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrl: './home-user.component.css'
})
export class HomeUserComponent implements OnInit {

  users:any[] =[];
  constructor(private ribbonService: BreadcrumbsService, private userService: UserService){}
  ngOnInit(): void {
    this.ribbonService.setBreadcrumbVisibility(true);
    this.userService.getUser().subscribe((data)=>{
      this.users = data;
    },
  (error) => {
    console.log('error al obtener datos',error);
  });
  }
selectedUser: any = null;
 

    selectUser(user:any){
      this.selectedUser  = user;
      console.log("usuario: ", user);
      this.ribbonService.setSelectedUser(user);
    }

}
