import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  // TODO
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }),
    responseType: 'text' as 'json'
  };

  constructor(private http: HttpClient) { }

  download(fileName: string): Observable<ArrayBuffer> {
    return this.http.get<ArrayBuffer>(environment.urlFSDownload + '/' + fileName, this.httpOptions);
  }

}
