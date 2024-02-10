import { Component, inject } from '@angular/core';
import { IEmployee } from '../../../interfaces/employee';
import { HttpService } from '../../http.service';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [MatTableModule,MatButtonModule, RouterLink],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  employeeList:IEmployee[]=[]
  httpService = inject(HttpService)
  displayedColumns: string[] = ['id', 'name', 'email', 'age','phone','salary'];
  ngOnInit(){
    this.httpService.getAllEmployee().subscribe(result=>{
    this.employeeList = result;})
  }
}
