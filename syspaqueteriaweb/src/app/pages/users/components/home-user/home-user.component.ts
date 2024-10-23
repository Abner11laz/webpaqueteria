import { Component, OnInit } from '@angular/core';
import { BreadcrumbsService } from '../../../../services/breadcrumbs.service';
import { UserService } from '../../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrl: './home-user.component.css'
})
export class HomeUserComponent implements OnInit {
  currentView: string = 'Dashboard'; // Vista inicial
  activeTab: string = 'manage'; // Pestaña activa inicial
  users:any[] =[];
  isLoading:boolean = true;
  constructor(private ribbonService: BreadcrumbsService, private userService: UserService, private router:Router, private route:ActivatedRoute){}
  ngOnInit(): void {
    this.ribbonService.setBreadcrumbVisibility(true);
    this.userService.getUser().subscribe((data)=>{
      this.users = data;
      this.isLoading = false;
      this.activeTab = 'manage'; // Cambia la pestaña activa cuando cambia la vista
    },
  (error) => {
    console.log('error al obtener datos',error);
    this.isLoading = false;
  });
  }
selectedUser: any = null;
 

    selectUser(user:any){
      this.selectedUser  = user;
      
      //this.ribbonService.setSelectedUser(user);
    }

    setActiveTab(tab: string) {
      this.activeTab = tab;
    }

    navigateToEditUser(): void {
      if (this.selectedUser > 0) {
        console.log("Has hecho clic en el usuario: ", this.selectedUser);
        this.router.navigate(['./users/edit-user', this.selectedUser], { relativeTo: this.route });
      }
    }
    navigateToCreateUser() {
      this.router.navigate(['./users/create-user'], { relativeTo: this.route });
    }

}
