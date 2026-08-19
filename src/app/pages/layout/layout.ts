import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterOutlet } from '@angular/router';
import { Sidenav } from '../sidenav/sidenav';
import { Iuser } from '../../core/model/interfaces/user.model';
import { GlobalConstant } from '../../core/globalConstant/Global.constant';

@Component({
  selector: 'app-layout',
  imports: [MatToolbar,MatIconModule,MatButtonModule,
    MatSidenav,MatSidenavContainer,MatSidenavContent,RouterOutlet,Sidenav],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {

  router = inject(Router);

  collapsed = signal(false);


  toggleButton() {
    this.collapsed.set(!this.collapsed());
  }

  sidenavWidth = computed(() => this.collapsed() ? '76px' : '270px');

  loggedUserData!: Iuser;

  nameIcon!:string;

  constructor() {
    const localData = localStorage.getItem(GlobalConstant.LOGIN_LOCAL_KEY);
    if(localData !== null) {
      this.loggedUserData = JSON.parse(localData);
      this.nameIcon = this.loggedUserData.employeeName.split(' ').map((val) => val[0]).join('').slice(0,2);
    } 
  }


  onLogOff() {
    localStorage.removeItem(GlobalConstant.LOGIN_LOCAL_KEY);
    this.router.navigateByUrl(GlobalConstant.LOGIN_STR);
  }
}
