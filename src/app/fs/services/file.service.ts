import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { File } from '../model/file';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  // TODO
  constructor() { }

  getFiles(): Observable<File[]> {
    return of([new File('uuidPostman'), new File('no existe')]);
  }

}
