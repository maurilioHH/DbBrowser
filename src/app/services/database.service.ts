import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { SearchTablesRequest } from './../model/search-tables-request';
import { DbConfigMap } from '../model/db-config.model';
import { InfoTabellaVista } from '../model/info-tabella-vista';
import { SearchTableColumnsRequest } from '../model/search-table-columns-request';
import { InfoColonna } from '../model/info-colonna';
import { QueryViewRequest } from '../model/query-view-request';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {

  private httpClient = inject(HttpClient);

  constructor() {}

  public getDatabases(): Observable<DbConfigMap> {
    return this.httpClient.get<DbConfigMap>('http://localhost:8085/api/database/getAll').pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => error);
      })
    );
  }

  public searchOwners(dbKey: string): Observable<string[]> {
    return this.httpClient.post<string[]>('http://localhost:8085/api/database/searchOwners', dbKey).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => error);
      })
    );
  }

  public searchTables(request: SearchTablesRequest): Observable<InfoTabellaVista[]>{
    return this.httpClient.post<InfoTabellaVista[]>('http://localhost:8085/api/database/searchTablesAndViews', request).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => error);
      })
    );
  } 

  public searchTableColumns(request: SearchTableColumnsRequest): Observable<InfoColonna[]>{
    return this.httpClient.post<InfoColonna[]>('http://localhost:8085/api/database/searchTableColumns', request).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => error);
      })
    );
  } 

  public getQueryView(request: QueryViewRequest): Observable<string>{
    return this.httpClient.post('http://localhost:8085/api/database/getQueryView', 
      request, { responseType: 'text' }).pipe(
      catchError((error) => {
        console.log(error);
        return throwError(() => error);
      })
    );
  } 


}
