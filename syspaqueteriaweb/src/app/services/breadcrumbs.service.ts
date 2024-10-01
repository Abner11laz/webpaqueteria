import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {
   
  private viewSubject = new BehaviorSubject<string>('Dashboard'); // Valor inicial "Clientes"
  currentView$ = this.viewSubject.asObservable();

  setView(view: string) {
    this.viewSubject.next(view);
  }
}
