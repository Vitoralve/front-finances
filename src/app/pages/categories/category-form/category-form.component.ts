import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { CategoryService } from "../shared/category.service";
import { Category } from "../shared/category.model";

import { switchMap } from "rxjs/operators";
import * as toastr from "toastr";
import { param } from 'jquery';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  items:any;
  currentAction: string | undefined ;
  categoryForm: FormGroup | any;
  pageTitle: string | undefined;
  serverErrorMessages:any[] = [];
  submittingForm: boolean = false;
  category: Category = new Category();
  userId:any;



  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,

  ) { 

    this.items = [
      {label: 'Home', icon:'pi pi-home', routerLink:'/'},
      {label: 'Categorias', routerLink:'/categories'},
      {label: 'Adicionar/Editar'}
    ]

   }


  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  submitForm(){
    this.submittingForm = true;

    if(this.currentAction = 'new'){
       this.createCategory();
    }else{
       this.updateCategory();
    } 
  }

  
  ngOnInit(): void {

     this.setCurrentAction();
     this.buildCategoryForm();
     this.loadCategory();

  }


  // Metodos Privados
   setCurrentAction(){
    if(this.route.snapshot.url[0].path == "new")
    this.currentAction = "new"
    else
    this.currentAction = "edit"
  }

   buildCategoryForm(){
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description:[null]
    })
  }

   loadCategory(){
    this.route.params.subscribe(params => this.userId = params['id']);
    if(this.currentAction == "edit"){
      this.route.paramMap.pipe(
        switchMap(params => this.categoryService.getById(this.userId))
      )
      .subscribe(
        (category) => {
          this.category = category;
          //Carregando categoria com o category Model
          this.categoryForm?.patchValue(this.category) 
        },
        (error) => alert('Ocorreu um erro no servidor, tente mais tarde')
        
      )
    }
  }


  //Carregamento de Titulo de acordo com a funcão
   setPageTitle(){
    if(this.currentAction == 'new'){
      this.pageTitle = "Cadastro de Nova Categoria"
    }else{
      const caetgoryName = this.category.name || ''
      this.pageTitle = 'Editando Categoria: ' + caetgoryName;
    }

  }

  createCategory(){
    const category: Category = Object.assign(new Category(), this.categoryForm.value);

    this.categoryService.create(category)
    .subscribe(
      category => this.actionsForSucces(category),
      error => this.actionsForError(error)
    )
  }

  updateCategory(){
    const category: Category = Object.assign(new Category(), this.categoryForm.value);

    this.categoryService.update(category)
    .subscribe(
      category => this.actionsForSucces(category),
      error => this.actionsForError(error)
    )

  }

  actionsForSucces(category: Category){
    toastr.success("Solicitação processada com sucesso!")

    //reload componente
    this.router.navigateByUrl('categories', {skipLocationChange:true}).then(
      () => this.router.navigate(['categories', category.id, "edit"])
    )

  }

  actionsForError(error:any){
    toastr.error("Ocorreu um erro ao processar a sua solicitação")

    this.submittingForm = false

    if(error.status === 422  ){
      this.serverErrorMessages = JSON.parse(error._body).errors;
    }else{
      this.serverErrorMessages = ["Falha na comunicação com o servidor"]
    }
  }

  
}
