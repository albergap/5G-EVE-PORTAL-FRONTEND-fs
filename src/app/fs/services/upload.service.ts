import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HttpOptions } from './http-options';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  upload(formData: FormData): Observable<void> {
    return this.http.post<void>(environment.urlFSUpload, formData, HttpOptions);
  }

}
