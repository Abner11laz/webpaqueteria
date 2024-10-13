import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {
  
  private viewSubject = new BehaviorSubject<string>('home-user'); // Valor inicial "Clientes"
  currentView$ = this.viewSubject.asObservable();
  setView(view: string) {
    this.viewSubject.next(view);
  }
   
    private breadcrumbVisibilitySource = new BehaviorSubject<boolean>(true);
    breadcrumbVisibility$ = this.breadcrumbVisibilitySource.asObservable();
  
    setBreadcrumbVisibility(isVisible: boolean) {
      this.breadcrumbVisibilitySource.next(isVisible);
      console.log("es visible el ribbon: ",isVisible)
    }

    private selectedUserSource = new BehaviorSubject<number>(0);
    selectedUser$ = this.selectedUserSource.asObservable();

    setSelectedUser(user:number){
      this.selectedUserSource.next(user);
    }

    private custselectedSource = new BehaviorSubject<number>(0);
    custSelected$ = this.custselectedSource.asObservable();

    setselectedCust(cusId:number){
      this.custselectedSource.next(cusId);
    }
}
