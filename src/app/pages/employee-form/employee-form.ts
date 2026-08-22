import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { EmployeeModel } from '../../core/model/classes/Employee.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MasterServ } from '../../core/services/master-serv';
import { IApiResponseModel, IChildDept, IParentDept } from '../../core/model/interfaces/user.model';
import { Employee } from '../../core/services/employee';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  imports: [ReactiveFormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.scss',
})
export class EmployeeForm implements OnInit {

  router = inject(Router);

  masterService = inject(MasterServ);

  employeeService = inject(Employee);

  activatedRoute = inject(ActivatedRoute);

  parentDepartmentList: WritableSignal<IParentDept[]> = signal([]) ;

  childDepartmentList: WritableSignal<IChildDept[]> = signal([]);

  employeeObj:EmployeeModel = new EmployeeModel();

  employeeForm: FormGroup = new FormGroup({
    employeeName: new FormControl(this.employeeObj.employeeName,[Validators.required]),
    contactNo: new FormControl(this.employeeObj.contactNo,[Validators.required]),
    emailId: new FormControl(this.employeeObj.emailId,[Validators.required]),
    deptId: new FormControl(this.employeeObj.deptId,[Validators.required]),
    password: new FormControl(this.employeeObj.password,[Validators.required]),
    gender: new FormControl(this.employeeObj.gender,[Validators.required]),
    role: new FormControl(this.employeeObj.role,[Validators.required]),
  });

  currentEmpId: number = 0;

  ngOnInit(): void {
    this.getParentDepartment();
    this.activatedRoute.params.subscribe({
      next: (res:any) => {
        this.currentEmpId = res.id;
        if(this.currentEmpId !== 0) {
          this.getEmployeeDetailsById()
        }
      }
    })
  }

  getEmployeeDetailsById() {
    this.employeeService.getEmployeByID(this.currentEmpId).subscribe({
      next: (res:EmployeeModel) => {
        this.employeeForm.patchValue(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getParentDepartment() {
    this.masterService.getAllParentDepartment().subscribe({
      next: (res:IApiResponseModel) => {
        this.parentDepartmentList.set(res.data);
      },
      error: (err) => {
        console.log(err.error);
      }
    })
  }

  onChangeParent(event:any) {
    const selectedElement = event.target as HTMLSelectElement;
    const selectedValue = Number(selectedElement.value);
    this.masterService.getAllChildDepartmentByParentId(selectedValue).subscribe({
      next: (res: IApiResponseModel) => {
        this.childDepartmentList.set(res.data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onSave() {
    const formValue = this.employeeForm.value;
    this.employeeService.createNewEmployee(formValue).subscribe({
      next: (res:EmployeeModel) => {
        debugger
        alert('New Employee Created successfully');
        this.router.navigateByUrl('admin/employee-list')
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onUpdate() {
    const formValue = this.employeeForm.value;
    formValue.employeeId = this.currentEmpId;
    formValue.createdDate = new Date().toISOString()
    this.employeeService.updateEmployeeById(this.currentEmpId,formValue).subscribe({
      next: (res) => {
        alert('Employee Details updated successfully');
        this.router.navigateByUrl('admin/employee-list');
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onClose() {
    this.router.navigateByUrl('admin/employee-list');
  }

}
