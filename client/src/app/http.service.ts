import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IEmployee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiUrl = "http://localhost:5062"
  http = inject(HttpClient)
  constructor() {}
  getAllEmployee(){
    return this.http.get<IEmployee[]>(this.apiUrl+"/api/Employee")
  }
}
