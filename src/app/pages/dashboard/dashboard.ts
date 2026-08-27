import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Employee } from '../../core/services/employee';
import { IDashboardModel, IProject, Iuser } from '../../core/model/interfaces/user.model';

@Component({
  selector: 'app-dashboard',
  imports: [DatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {

  employeeService = inject(Employee);

  recentEmployees: WritableSignal<Iuser[]> = signal([]);

  recentProjects: WritableSignal<IProject[]> = signal([]);

  employeeCount: WritableSignal<number> = signal(0);

  projectCount: WritableSignal<number> = signal(0);

  ngOnInit(): void {
    this.getDashboard();
  }

  getFirstLetter(value: string): string {
    return value?.trim().charAt(0).toUpperCase() ?? '';
  }

  getDashboard() {
    this.employeeService.getDashboard().subscribe({
      next: (res:IDashboardModel) => {
        this.recentEmployees.set(res.recentEmployee.slice(0,2));
        this.recentProjects.set(res.recentProjects.slice(0,3));
        this.employeeCount.set(res.totalEmployee);
        this.projectCount.set(res.totalProject);
      }
    })
  }

}
