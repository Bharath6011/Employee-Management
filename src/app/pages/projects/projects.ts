import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../../core/services/project-service';
import { Observable } from 'rxjs';
import { IAllProjectEmployees, IProject, NewProjectModel } from '../../core/model/interfaces/user.model';
import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { Employee } from '../../core/services/employee';
import { EmployeeModel } from '../../core/model/classes/Employee.model';
import { MatDialog } from '@angular/material/dialog';
import { ProjectAssignment } from '../project-assignment/project-assignment';

@Component({
  selector: 'app-projects',
  imports: [ReactiveFormsModule,NgClass,DatePipe,AsyncPipe],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements OnInit {

  dialog = inject(MatDialog);

  projectForm!: FormGroup;

  projectList = signal<IProject[]>([]);

  isProjectFormVisible = signal(false);

  getAllProjectEmployeesList:WritableSignal<IAllProjectEmployees[]> = signal<IAllProjectEmployees[]>([]);

  projectService = inject(ProjectService);

  projectsNumber!:number;

  empService = inject(Employee);

  currentProjectId: number = 0;

  empList$: Observable<EmployeeModel[]> = new Observable<EmployeeModel[]>();

  currentProjectEmployees:WritableSignal<IAllProjectEmployees[]> = signal<IAllProjectEmployees[]>([]);

  constructor() {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  openDialog(id:number) {
    this.currentProjectId = id;
    const dialogRef = this.dialog.open(ProjectAssignment, {
      height: '600px',
      width: '800px',
      panelClass: 'project-assignment-dialog',
      hasBackdrop: false,
      disableClose: true,
      data: {projectId: this.currentProjectId},
      minWidth: '700px'
    });
  }

  onDeleteProject(id:number) {
    this.projectService.deleteProjectById(id).subscribe({
      next: (res) => {
        alert('Project Deleted successfully');
        this.loadProjects();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  initializeForm() {
    this.projectForm = new FormGroup({
      projectId: new FormControl(0),
      projectName: new FormControl(''),
      clientName: new FormControl(''),
      startDate: new FormControl(''),
      leadByEmpId: new FormControl(0),
      contactPerson: new FormControl(''),
      contactNo: new FormControl(''),
      emailId: new FormControl('')
    })
  }

  loadProjects() {
    this.projectService.getAllProjects().subscribe({
      next: (res: IProject[]) => {
        this.projectList.set(res);
        this.projectsNumber = res.length;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  createProject() {
    const formValue = this.projectForm.value;
    this.projectService.createProjects(formValue).subscribe({
      next: (res) => {
        alert('Project Created Successfully');
        this.loadProjects();
        this.resetForm();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  showProjectForm() {
    this.isProjectFormVisible.set(true);
    this.empList$ = this.empService.getAllEmployees();
  }

  saveProject() {
    const formValue: NewProjectModel = this.projectForm.value;
    this.projectService.createProjects(formValue).subscribe({
      next: (res: NewProjectModel) => {
        alert('Project saved successfully');
        this.loadProjects();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  resetForm() {
    this.projectForm = new FormGroup({
      projectId: new FormControl(0),
      projectName: new FormControl(''),
      clientName: new FormControl(''),
      startDate: new FormControl(''),
      leadByEmpId: new FormControl(0),
      contactPerson: new FormControl(''),
      contactNo: new FormControl(''),
      emailId: new FormControl('')
    })
  }

  closeForm() {
    this.isProjectFormVisible.set(false);
  }
}
