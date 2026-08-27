import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { GlobalConstant } from '../globalConstant/Global.constant';
import { Observable } from 'rxjs';
import { IApiResponseModel } from '../model/interfaces/user.model';

@Injectable({
  providedIn: 'root',
})
export class MasterServ {
 
  http = inject(HttpClient);

  getAllParentDepartment(): Observable<IApiResponseModel> {
    return this.http.get<IApiResponseModel>(environment.API_URL + GlobalConstant.API_METHOD.PARENT_DEPARTMENT_STR);
  }

  getAllChildDepartmentByParentId(id: number): Observable<IApiResponseModel> {
    return this.http.get<IApiResponseModel>(environment.API_URL + GlobalConstant.API_METHOD.CHILD_DEPARTMENT_PARENT_ID_STR + GlobalConstant.QUESTION_MARK + GlobalConstant.DEPT_ID_STR + GlobalConstant.EQUALS + `${id}`);
  }

}
