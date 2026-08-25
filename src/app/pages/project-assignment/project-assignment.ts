import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../../core/services/employee';
import { ProjectService } from '../../core/services/project-service';
import { IAllProjectEmployees, IUserProjectAssign } from '../../core/model/interfaces/user.model';
import { DatePipe } from '@angular/common';
import { EmployeeModel } from '../../core/model/classes/Employee.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-assignment',
  imports: [DatePipe, FormsModule],
  templateUrl: './project-assignment.html',
  styleUrl: './project-assignment.scss',
})
export class ProjectAssignment implements OnInit {

  dialogRef = inject(MatDialogRef<any>);

  empService = inject(Employee);

  data = inject(MAT_DIALOG_DATA);

  getAllProjectEmployeesList: WritableSignal<IAllProjectEmployees[]> = signal<IAllProjectEmployees[]>([])

  projectService = inject(ProjectService);

  currentProjectEmployeesList: WritableSignal<IAllProjectEmployees[]> = signal<IAllProjectEmployees[]>([])

  currentProjectId = this.data.projectId;

  employeeList: WritableSignal<EmployeeModel[]> = signal<EmployeeModel[]>([]);

  projectAssignObj: IUserProjectAssign = {
    "empProjectId": 0,
    "projectId": 0,
    "empId": 0,
    "assignedDate": "",
    "role": "",
    "isActive": false
  }



  ngOnInit(): void {
    this.getAllEmployee();
    this.getAllProjectEmployees();
  }

  getCurrentProjectEmployees() {
    this.currentProjectEmployeesList.set(this.getAllProjectEmployeesList().filter(m => m.projectId === this.currentProjectId));
    console.log(this.currentProjectEmployeesList());
  }

  onCreate() {
    this.dialogRef.close();
  }

  assignEmp() {
    this.projectAssignObj.projectId = this.currentProjectId;
    this.projectService.assignProjectToEmployee(this.projectAssignObj).subscribe({
      next: (res) => {
        alert('Employee Successfully assigned to project');
        this.getAllProjectEmployees();
        this.resetForm();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getAllEmployee() {
    this.empService.getAllEmployees().subscribe({
      next: (res: EmployeeModel[]) => {
        this.employeeList.set(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onCancel() {
    this.dialogRef.close();
  }

  getAllProjectEmployees() {
    this.projectService.getAllProjectEmployees().subscribe({
      next: (res: IAllProjectEmployees[]) => {
        this.getAllProjectEmployeesList.set(res);
        this.getCurrentProjectEmployees();
      }
    })
  }

  resetForm() {
    this.projectAssignObj = {
      "empProjectId": 0,
      "projectId": 0,
      "empId": 0,
      "assignedDate": "",
      "role": "",
      "isActive": false
    }
  }

}
