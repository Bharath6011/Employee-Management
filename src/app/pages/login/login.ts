import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { GlobalConstant } from '../../core/globalConstant/Global.constant';

@Component({
  selector: 'app-login',
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  http = inject(HttpClient);

  router = inject(Router);

  loginObj = new FormGroup({
    userName: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(5)])
  });

  login() {
    const formValue = this.loginObj.value;
    this.http.post(environment.API_URL + GlobalConstant.LOGIN_STR,formValue).subscribe({
      next: (response:any) => {
        if(response.result) {
          alert('User Logged in successfully');
          localStorage.setItem(GlobalConstant.LOGIN_LOCAL_KEY,JSON.stringify(response.data));
          this.router.navigateByUrl('admin/dashboard');
        } else {
          alert(response.message);
        }
      },
      error: (err) => {
        alert('Api Error');
      }
    })
  }


}
