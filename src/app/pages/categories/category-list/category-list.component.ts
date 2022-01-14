import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  items:any;


  constructor() { }

  ngOnInit(): void {
    this.items = [
      {label: 'Home', icon:'pi pi-home', routerLink:'/'},
      {label: 'Categorias'}
  ];
}
  

}
