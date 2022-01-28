import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import { InMemoryDatabase } from "./in-memory-database";
import { HttpClientModule } from '@angular/common/http';
import { CategoryFormComponent } from './pages/categories/category-form/category-form.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
