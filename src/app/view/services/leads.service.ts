import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError ,pipe, retry} from 'rxjs';
import { Lead } from 'src/app/core/Models/Leads';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LeadsService {

  constructor(private http: HttpClient) {}

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


  getAllLeads(): Observable<Lead[]> {
    return this.http.get<Lead[]>(`${environment.baseUrl}/leads`).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getPotentialDuplicates(leadId: string): Observable<string[]> {
    return this.http
      .get<string[]>(`${environment.baseUrl}/leads/${leadId}/potential-duplicates`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      )
  }

  markAsDuplicate(leadId: string, duplicateIds: string[]): Observable<void> {
    return this.http
      .put<void>(`${environment.baseUrl}/leads/${leadId}`, { duplicate_of: duplicateIds[0] })
      .pipe(
        retry(3),
        catchError(this.handleError)
      )
  }
}