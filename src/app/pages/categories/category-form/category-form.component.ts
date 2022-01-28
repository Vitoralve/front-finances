import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  items:any;

  constructor() { 

    this.items = [
      {label: 'Home', icon:'pi pi-home', routerLink:'/'},
      {label: 'Categorias', routerLink:'/categories'},
      {label: 'Nova Categoria'}
    ]

   }

  
  ngOnInit(): void {
  }

}
