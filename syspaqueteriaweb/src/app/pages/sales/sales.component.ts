import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  currentDate: string = '';

  ngOnInit(): void {
    // Obtén la fecha actual
    const today = new Date();
    const day = ('0' + today.getDate()).slice(-2);
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const year = today.getFullYear();

    // Formatea la fecha como YYYY-MM-DD para el input de tipo date
    this.currentDate = `${year}-${month}-${day}`;
  }
}
