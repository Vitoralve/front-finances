import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

import { Category } from "../shared/category.model";
import { CategoryService } from "../shared/category.service";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  items:any;

  categories:Category[] = [];

  constructor(
    private CategoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.items = [
      {label: 'Home', icon:'pi pi-home', routerLink:'/'},
      {label: 'Categorias'}   
    ];

    this.CategoryService.getAll().subscribe(
      categories => this.categories = categories,
      error => alert('Erro ao carregar a lista')
    )

  }

  deleteCategory(category:any){
    const mustDelete = confirm('Deseja realmente excluir este item')

    if(mustDelete){
    this.CategoryService.delete(category.id).subscribe(
      () => this.categories = this.categories.filter(element => element != category),
      () => alert('Erro ao tentar excluir')    
      )
    }
  }
  

}
