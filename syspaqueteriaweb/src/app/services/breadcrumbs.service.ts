import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {
  
  private viewSubject = new BehaviorSubject<string>('Productos'); // Valor inicial "Clientes"
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
}
