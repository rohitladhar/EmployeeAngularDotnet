import { Component, inject } from '@angular/core';
import { IEmployee } from '../../../interfaces/employee';
import { HttpService } from '../../http.service';
@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  employeeList:IEmployee[]=[]
  httpService = inject(HttpService)
  ngOnInit(){
    this.httpService.getAllEmployee().subscribe(result=>{console.log(result);
    this.employeeList = result;})
  }
}
