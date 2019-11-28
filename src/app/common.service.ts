import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {Categorias} from './shared/kits/categorias';
import {catchError, retry} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  apiURL = 'http://192.168.1.34:3000';

  constructor(private http: HttpClient, public router: Router) { }

  getCategorias(): Observable<Categorias> {
    return this.http.get<Categorias>(this.apiURL + '/categorias')
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Error handling
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
