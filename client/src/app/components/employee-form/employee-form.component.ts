import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../../http.service';
import { IEmployee } from '../../../interfaces/employee';
@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [MatInputModule,MatButtonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {
  formBuilder = inject(FormBuilder)
  httpService = inject(HttpService)
  employeeForm = this.formBuilder.group({
    name:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    age:[0,[Validators.required]],
    phone:[0,[]],
    salary:[0,[Validators.required]]
  })

  save(){
    const employee:IEmployee={
      name:this.employeeForm.value.name!,
      email:this.employeeForm.value.email!,
      age:this.employeeForm.value.age!,
      phone:this.employeeForm.value.phone!,
      salary:this.employeeForm.value.salary!
    }
    this.httpService.createEmployee(employee).subscribe(()=>{
      alert("success")
    })
    
  }

}
