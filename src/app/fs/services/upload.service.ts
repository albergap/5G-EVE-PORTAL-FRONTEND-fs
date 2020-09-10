import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  // TODO
  httpOptions = { headers: new HttpHeaders({ Authorization: 'Bearer ' + localStorage.getItem('token') }) };

  constructor(private http: HttpClient) { }

  upload(formData: FormData): Observable<void> {
    return this.http.post<any>(environment.urlFSUpload, formData, this.httpOptions);
  }

}
