import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  httpOption:any;
  navWidth:boolean = false;

  constructor(private _http:HttpClient) {
   }

  //  Set hesaders Data
  // private setHeaders(key: string , value:string){
  //   this.httpOption.headers.set(key, value);
  // }

  // Handle request
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  // Get All Data Of Apis
  getAll(apiRoute:string):Observable<any>{
    return this._http.get<any>(`${environment.baseUrl}${apiRoute}`)
    .pipe(
      retry(3),
      catchError(this.handleError)
    )
  }

  // Get Data By Id
  getById(id:number,apiRoute:string):Observable<any>{
    return this._http.get<any>(`${environment.baseUrl}${apiRoute}/${id}`)
    .pipe(
      retry(3),
      catchError(this.handleError)
    )
  }

  // Add Data To Api
  post(newObject:any,apiRoute:string):Observable<any>{
    return this._http.post<any>(`${environment.baseUrl}${apiRoute}` , newObject)
    .pipe(
      retry(3),
      catchError(this.handleError)
    )
  }

  // Update Data By Id
  put(newObject:any,apiRoute:string):Observable<any>{
    return this._http.put<any>(`${environment.baseUrl}${apiRoute}` , newObject)
    .pipe(
      retry(3),
      catchError(this.handleError)
    )

  }

  // Delete Data From Api By Id
  delete(id:number,apiRoute:string):Observable<any>{
    return this._http.delete<any>(`${environment.baseUrl}${apiRoute}/${id}`)
    .pipe(
      retry(3),
      catchError(this.handleError)
    )

  }

}