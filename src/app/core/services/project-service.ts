import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { GlobalConstant } from '../globalConstant/Global.constant';
import { IProject, NewProjectModel } from '../model/interfaces/user.model';
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
  
}
