import { Component, inject } from '@angular/core';
import { Employee } from '../../core/services/employee';
import { EmployeeModel } from '../../core/model/classes/Employee.model';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  imports: [RouterLink,AsyncPipe],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.scss',
})
export class EmployeeList {

  employeeService = inject(Employee);

  employeeList$: Observable<EmployeeModel[]> = new Observable<EmployeeModel[]>;

  constructor() {
    this.employeeList$ = this.employeeService.getAllEmployees();
  }

  onDelete(id:number) {
    this.employeeService.DeleteEmployeeById(id).subscribe({
      next: (res) => {
        alert('Employee Deleted successfully');
        this.employeeList$ = this.employeeService.getAllEmployees();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
 