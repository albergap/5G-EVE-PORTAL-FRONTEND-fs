import { HttpHeaders } from '@angular/common/http';

export const HttpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};

export const HttpOptionsText = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }),
  responseType: 'text' as 'json'
};
