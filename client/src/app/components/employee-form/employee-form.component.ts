import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../../http.service';
import { IEmployee } from '../../../interfaces/employee';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  router = inject(Router)
  route = inject(ActivatedRoute)
  toaster = inject(ToastrService)
  employeeForm = this.formBuilder.group({
    name:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    age:[0,[Validators.required]],
    phone:[0,[Validators.pattern("^[0-9]*$")]],
    salary:[0,[Validators.required]]
  })

  employeeId!:number;
  isEdit = false;
  ngOnInit(){
    this.employeeId = this.route.snapshot.params['id']
    if(this.employeeId){
      this.isEdit = true;
      this.httpService.getEmployee(this.employeeId).subscribe(result=>{      
        this.employeeForm.patchValue(result)
        this.employeeForm.controls.email.disable();
      })
    }  
  }

  save(){
    const employee:IEmployee={
      name:this.employeeForm.value.name!,
      email:this.employeeForm.value.email!,
      age:this.employeeForm.value.age!,
      phone:this.employeeForm.value.phone!,
      salary:this.employeeForm.value.salary!
    }
    if(this.isEdit){
      this.httpService.updateEmployee(this.employeeId,employee).subscribe(()=>{
        this.toaster.success("Record Updated Successfully")
        this.router.navigateByUrl("/employee-list");
      })
    }else{
      this.httpService.createEmployee(employee).subscribe(()=>{
        this.toaster.success("Record Created Successfully")
        this.router.navigateByUrl("/employee-list");
      })
    }
  }
  
}
