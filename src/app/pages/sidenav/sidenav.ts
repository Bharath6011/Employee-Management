import { Component, Input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface MenuItems {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidenav',
  imports: [MatListModule, MatIconModule,RouterLink,RouterLinkActive],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav {

  sidenavCollapsed = signal<boolean>(false);

  @Input() set collapsed(val:boolean) {
    this.sidenavCollapsed.set(val);
  }

  menuItemList = signal<MenuItems[]>([
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: 'dashboard'
    },
    {
      label: 'Employees',
      icon: 'badge',
      route: 'employee-list'
    },
    {
      label: 'Projects',
      icon: 'folder',
      route: 'project-list'
    },
    {
      label: 'Assignments',
      icon: 'assignment',
      route: 'assignments'
    },
    {
      label: 'Reports',
      icon: 'article',
      route: 'reports'
    }
  ])

}