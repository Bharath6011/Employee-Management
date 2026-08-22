import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../../core/services/project-service';
import { Observable } from 'rxjs';
import { IProject, NewProjectModel } from '../../core/model/interfaces/user.model';

@Component({
  selector: 'app-projects',
  imports: [ReactiveFormsModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements OnInit {

  projectForm!: FormGroup;

  projectList = signal<IProject[]>([]);

  projectService = inject(ProjectService);

  constructor() {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadProjects();
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
      },
      error: (err) => {
        console.log(err);
      }
    })
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
}
