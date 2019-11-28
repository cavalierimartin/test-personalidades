import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Instrucciones } from '../shared/instrucciones';
import { Personalidades } from '../shared/personalidades';
import { PregsRes } from '../shared/pregs-res';
import { Respuestas } from '../shared/respuestas';
import { AlertService } from './alert.service';
import {Observable, throwError, forkJoin, pipe} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  apiURL = 'http://192.168.1.34:3000';
  respuestas: any = [];
  personalidades: any = [];
  instrucciones: any = [];
  pregsRes: any = [];
  loading = false;

  constructor(private http: HttpClient, public router: Router, private alertService: AlertService) { }
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  getAllToCreateForm(): Observable<any[]> {
    const instrucciones = this.http.get(this.apiURL + '/instrucciones');
    const respuestas = this.http.get(this.apiURL + '/respuestas');
    const personalidades = this.http.get(this.apiURL + '/personalidades');
    const pregsRes = this.http.get(this.apiURL + '/pregs-res');
    return forkJoin([instrucciones, respuestas, personalidades, pregsRes]);
  }

  getInstrucciones(): Observable<Instrucciones> {
    return this.http.get<Instrucciones>(this.apiURL + '/instrucciones')
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  getInstruccionById(id): Observable<Instrucciones> {
    return this.http.get<Instrucciones>(this.apiURL + '/instrucciones/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getPersonalidades(): Observable<Personalidades> {
    return this.http.get<Personalidades>(this.apiURL + '/personalidades')
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  getPersonalidadById(id): Observable<Personalidades> {
    return this.http.get<Personalidades>(this.apiURL + '/personalidades/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getRespuestas(): Observable<Respuestas> {
    // console.log(this.http.get<Respuestas>(this.apiURL + '/respuestas'));
    return this.http.get<Respuestas>(this.apiURL + '/respuestas')
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  getRespuestaById(id): Observable<Respuestas> {
    return this.http.get<Respuestas>(this.apiURL + '/respuestas/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // respuesta: { value: string, definition: string }; // Falta el id de la pregunta
  // pregRes: { id_pregunta: number, id_personalidad: number }; // Falta el id del preg-res y el id de la respuesta
  createPregRes(respuesta,  pregRes) {
    return this.http.post<Respuestas>(this.apiURL + '/respuestas', JSON.stringify(respuesta), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
      .subscribe(value => {
        pregRes.id_respuesta = value.id;
        this.http.post<PregsRes>(this.apiURL + '/pregs-res', JSON.stringify(pregRes), this.httpOptions)
          .pipe(
            retry(1),
            // catchError(this.handleError)
          )
          .subscribe(
            data => {
              this.alertService.success('Respuesta registrada', true);
              this.router.navigate(['/pregsres/nuevo'], { queryParams: { status: 'created' }});
            },
              error => {
            this.alertService.error(error);
            this.loading = false;
          });
      });
  }

  getPregsRes(): Observable<PregsRes> {
    return this.http.get<PregsRes>(this.apiURL + '/pregs-res')
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  getPregRedById(id): Observable<PregsRes> {
    return this.http.get<PregsRes>(this.apiURL + '/pregs-res/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  setPregRes(pregRes): Observable<PregsRes> {
    return this.http.post<PregsRes>(this.apiURL + '/pregs-res', JSON.stringify(pregRes), this.httpOptions)
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
