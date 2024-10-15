import { Component } from '@angular/core';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { filter } from 'rxjs';
import Swal from 'sweetalert2';
//import { Router } from 'express';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css'
})
export class BreadcrumbsComponent {
  showBreadcrumb: boolean = true; 
  currentView: string = 'Dashboard'; // Vista inicial
  activeTab: string = 'manage'; // Pestaña activa inicial
  selectedUser: number=0;
  selectedidCust: number=0;
  isDeleted: boolean =false;
  constructor(private ribbonService: BreadcrumbsService, private route:ActivatedRoute, private router: Router, private customerService:CustomerService) {}
  navigateToCreateCustomer() {
    this.router.navigate(['./customers/create-customer'], { relativeTo: this.route });
  }

  navigateToCreateUser(){
    this.router.navigate(['./users/create-user'],{relativeTo: this.route})
  }

 

  ngOnInit(): void {
    this.ribbonService.setBreadcrumbVisibility(false);
    this.ribbonService.currentView$.subscribe(view => {
      this.currentView = view;
      console.log("Desde breadcrumbs component ts ->",view);
      this.activeTab = 'manage'; // Cambia la pestaña activa cuando cambia la vista

     

    });
    this.ribbonService.breadcrumbVisibility$.subscribe(visible=>{
      this.showBreadcrumb = visible;
      console.log("mostrar breadcrubs: ", this.showBreadcrumb);
    });

    this.ribbonService.selectedUser$.subscribe(user => {
      this.selectedUser = user;
      console.log("Usuario desde breadcrumbs component: ", user);
    });

    this.ribbonService.custSelected$.subscribe(cust => {
        this.selectedidCust = cust;
        console.log("El id del cliente que se selecciono es: ", this.selectedidCust);
    });
/*
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.showBreadcrumb = !this.router.url.includes('/dashboard/customers/create-customer');
    });
    */
   
  }
  editarProducto(){
    if(this.selectedUser>0){
      console.log('Editando usuario: ', this.selectedUser);
    }
  }
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }


  navigateToEditCustomer():void{

    if(this.selectedidCust >0){
      console.log("Has hecho clic en el id: ", this.selectedidCust);
      this.router.navigate(['./customers/edit-customer',this.selectedidCust],{relativeTo: this.route})
    }else{
      console.log("No se ha seleccionado ningun cliente");
      //Poder llamar a una ventana emergente.
    }
   
  }

  confirmdeleteCust(event: Event):void{
    if(this.selectedidCust >0){
      event.stopPropagation(); // Evitar que se dispare el evento de click en la fila

      // Mostrar la ventana emergente de confirmación con SweetAlert2
      Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          // Si el usuario confirma, llama a la función para eliminar el cliente
          //this.deleteCliente(clienteID);
        this.deleteCustomer()

         
        }
      });
    }else{
      console.log("no se ha seleccionado ningun cliente a eliminar");
    }
  }

    deleteCustomer():void{
     
      this.customerService.deleteCustomerP(this.selectedidCust).subscribe(response=>{
        Swal.fire(
          '¡Eliminado!',
          'El cliente ha sido eliminado.',
          'success'
        );
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['./customers'], { relativeTo: this.route });
      },
        error=>{
        Swal.fire(
        'Error!',
        'El cliente no ha sido eliminado.',
        'error'
      );
      console.log("error al eliiminar el cliente: ", error);
    });
   
    
    }
    navigateToEditUser():void{

      if(this.selectedUser >0){
        console.log("Has hecho clic en el usuario: ", this.selectedUser);
        this.router.navigate(['./users/edit-user',this.selectedUser],{relativeTo: this.route})
      }
    }
  /*activeTab: string = 'manage'; // La pestaña por defecto es 'manage'

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }*/
}
