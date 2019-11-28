import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Kits } from '../shared/kits/kits';
import { Categorias } from '../shared/kits/categorias';
import { CategoriasKits } from '../shared/kits/categorias-kits';
import { AlertService } from './alert.service';
import {Observable, throwError, forkJoin, pipe} from 'rxjs';
import {retry, catchError, map, flatMap, concatMap} from 'rxjs/operators';
import { Router } from '@angular/router';
import {forEach} from '@angular/router/src/utils/collection';
import {PregsRes} from './pregs-res';

@Injectable({
  providedIn: 'root'
})
export class KitsService {
  apiURL = 'http://192.168.1.34:3000';
  // respuestas: any = [];
  // personalidades: any = [];
  // instrucciones: any = [];
  // pregsRes: any = [];
  loading = false;

  constructor(private http: HttpClient, public router: Router, private alertService: AlertService) { }
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getKits(): Observable<Kits> {
    return this.http.get<Kits>(this.apiURL + '/kits')
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getKitById(idKit): Observable<Kits> {
    return this.http.get<Kits>(this.apiURL + '/kits/' + idKit)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getCategoriasKitsByIdCategoria(idCategoria): Observable<CategoriasKits[]> {
    const params = new HttpParams().set('id_categoria', idCategoria);
    return this.http.get<CategoriasKits[]>(this.apiURL + '/categorias_kits/', {params: params})
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getKitsByIdCategoria(idCategoria) { // #FIXME
    const params = new HttpParams().set('id_categoria', idCategoria);
    let kits: any = [];
    const http = this.http;
    const apiURL = this.apiURL;
    const handleError = this.handleError;
    const kitsService = this;

    return this.http.get<CategoriasKits>(this.apiURL + '/categorias_kits/', {params: params})
      .pipe(
        retry(1),
        // concatMap(value => <Observable<Kits>> http.get<Kits>(apiURL + '/kits/' + value.id_kit) ),
        // concatMap(value => http.get<Kits>(apiURL + '/kits/' + value.id_kit) ),
        catchError(handleError),
        // flatMap((result: Array<Kits>) => {
        //   return Observable.forkJoin(
        //     result.map((ck: CategoriasKits) => kitsService.getKitById(ck.id_kit))
        //   );
        // }),
        // map(value =>
        //     kitsService.getKitById(value)
        // )
      );
  }

  getCategoriasKits(): Observable<CategoriasKits> {
    return this.http.get<CategoriasKits>(this.apiURL + '/categorias_kits')
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getCategorias(): Observable<Categorias> {
    return this.http.get<Categorias>(this.apiURL + '/categorias')
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getAllInfo(): Observable<any[]> {
    const categorias = this.http.get(this.apiURL + '/categorias/');
    const categoriasKits = this.http.get(this.apiURL + '/categorias_kits/');
    const kits = this.http.get(this.apiURL + '/kits/');
    return forkJoin([categoriasKits, kits, categorias]);
  }

  getCategoriaById(idCategoria): Observable<Categorias> {
    return this.http.get<Categorias>(this.apiURL + '/categorias/' + idCategoria)
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
