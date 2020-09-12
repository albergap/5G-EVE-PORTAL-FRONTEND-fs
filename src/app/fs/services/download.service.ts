import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HttpOptionsText } from './http-options';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private http: HttpClient) { }

  download(fileName: string): Observable<ArrayBuffer> {
    return this.http.get<ArrayBuffer>(environment.urlFSDownload + '/' + fileName, HttpOptionsText);
  }

}
