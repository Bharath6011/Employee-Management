import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { GlobalConstant } from '../globalConstant/Global.constant';
import { IAllProjectEmployees, IProject, IUserProjectAssign, NewProjectModel } from '../model/interfaces/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  http = inject(HttpClient);
  

  getAllProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>(environment.API_URL + GlobalConstant.API_METHOD.GET_ALL_Projects);
  }

  createProjects(obj:NewProjectModel): Observable<NewProjectModel> {
    return this.http.post<NewProjectModel>(environment.API_URL + GlobalConstant.API_METHOD.CREATE_NEW_PROJECTS,obj);
  }

  getAllProjectEmployees():Observable<IAllProjectEmployees[]> {
    return this.http.get<IAllProjectEmployees[]>(environment.API_URL + GlobalConstant.API_METHOD.GET_ALL_PROJECT_EMPLOYEES);
  }

  assignProjectToEmployee(obj: IUserProjectAssign): Observable<IUserProjectAssign> {
    return this.http.post<IUserProjectAssign>(environment.API_URL + GlobalConstant.API_METHOD.CREATE_PROJECT_EMPLOYEE,obj);
  }

  deleteProjectById(id:number) {
    return this.http.delete(environment.API_URL + GlobalConstant.API_METHOD.DELETE_PROJECT + id);
  }

  deleteEmployeeFromProject(id:number) {
    return this.http.delete(environment.API_URL + GlobalConstant.API_METHOD.DELETE_EMPLOYEE_FROM_PROJECT + id)
  }
  
}
