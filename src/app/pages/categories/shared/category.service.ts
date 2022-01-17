import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError} from 'rxjs';
import {map, catchError, flatMap } from 'rxjs/operators';

import {Category} from './category.model'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiPath: string ='api/categories';

  constructor() { }
}
