import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { GlobalConstant } from '../globalConstant/Global.constant';
import { EmployeeModel } from '../model/classes/Employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Employee {
  
  http = inject(HttpClient);

  getAllEmployees():Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>(environment.API_URL+GlobalConstant.API_METHOD.GET_ALL_EMPLOYEES_STR);
  }

  createNewEmployee(obj: EmployeeModel): Observable<EmployeeModel> {
    const formValue = obj;
    return this.http.post<EmployeeModel>(environment.API_URL+ GlobalConstant.API_METHOD.CREATE_EMPLOYEE_STR,formValue);
  }

  getEmployeByID(id:number): Observable<EmployeeModel> {
    return this.http.get<EmployeeModel>(environment.API_URL + GlobalConstant.API_METHOD.GET_EMPLOYEE_STR + id);
  }

  updateEmployeeById(id: number,obj: EmployeeModel): Observable<EmployeeModel> {
    return this.http.put<EmployeeModel>(environment.API_URL + GlobalConstant.API_METHOD.UPDATE_EMPLOYEE_STR + id,obj);
  }

  DeleteEmployeeById(id:number) {
    return this.http.delete(environment.API_URL + GlobalConstant.API_METHOD.DELETE_EMPLOYEE_BY_ID + id);
  }

}
