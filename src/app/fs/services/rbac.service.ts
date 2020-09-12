import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from './../model/user';
import { LoginResponse } from './../model/loginResponse';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RBACService {

  constructor(private http: HttpClient) { }

  login(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(environment.urlRBACLogin, user);
  }

}
