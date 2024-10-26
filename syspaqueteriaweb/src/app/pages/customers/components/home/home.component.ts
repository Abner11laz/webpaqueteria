import { Component, OnInit } from '@angular/core';
import { BreadcrumbsService } from '../../../../services/breadcrumbs.service';
import { CustomerService } from '../../../../services/customer.service';
import { ActivatedRoute,Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  activeTab: string = 'manage'; // Pestaña activa inicial
  clientes:any[]=[];
  notisLoading:boolean = false;
  custselectedId: number = 0;
  constructor(private breadCrumbService: BreadcrumbsService, private customerService:CustomerService, private route:ActivatedRoute, private router:Router){}
  
  ngOnInit(): void {
    this.breadCrumbService.setBreadcrumbVisibility(true);
    this.customerService.getCustomers().subscribe((response)=>{
      this.clientes = response;
      console.log("Data de clientes: ", this.clientes);
      this.notisLoading = true;
      this.activeTab = 'manage'; // Cambia la pestaña activa cuando cambia la vista
    },
  (error)=>{
    console.log("error: ", error);
    this.notisLoading = true;
  });
  }
  navigateToCreateCustomer() {
    this.router.navigate(['./create-customer'], { relativeTo: this.route });
   
  }

  selectedCustomer: number = 0;
  asideVisible = false;

  showDetails(customerId: number) {
   console.log("Cliente seleccionado desde vista: ", customerId);
    this.asideVisible = true;
    this.selectedCustomer = customerId;
    this.breadCrumbService.setselectedCust(customerId)
  }

  hideDetails() {
    this.asideVisible = false;
  }
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  confirmdeleteCust(event: Event): void {
    if (this.selectedCustomer > 0) {
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
      }).then((result: { isConfirmed: any; }) => {
        if (result.isConfirmed) {
          this.deleteCustomer();
        }
      });
    } else {
      console.log("No se ha seleccionado ningún cliente a eliminar");
    }
  }
  navigateToEditCustomer(): void {
    if (this.selectedCustomer > 0) {
      console.log("Has hecho clic en el id: ", this.selectedCustomer);
      this.router.navigate(['./edit-customer', this.selectedCustomer], { relativeTo: this.route });
    } else {
      console.log("No se ha seleccionado ningún cliente");
    }
  }

  deleteCustomer(): void {
    this.customerService.deleteCustomerP(this.selectedCustomer).subscribe(response => {
      Swal.fire(
        '¡Eliminado!',
        'El cliente ha sido eliminado.',
        'success'
      );
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['./customers'], { relativeTo: this.route });
    }, error => {
      Swal.fire(
        'Error!',
        'El cliente no ha sido eliminado.',
        'error'
      );
      console.log("Error al eliminar el cliente: ", error);
    });
  }

}
