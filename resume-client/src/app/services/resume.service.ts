import { Injectable } from '@angular/core';
import { HttpEventType, HttpEvent, HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { Resume } from '../models/resume.model';
import { catchError, tap, last, map } from "rxjs/operators";

const baseUrl = 'http://localhost:8080/resume';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  params = new HttpParams();

  constructor(private http: HttpClient) { }

  get(): Observable<Resume> {
    return this.http.get(baseUrl);
  }

  create(data: Resume): Observable<any> {
    return this.http.post(baseUrl, data).pipe(
      catchError(this.handleError)
    )
  }

  delete(): Observable<any> {
    console.log("enter")
    return this.http.delete(baseUrl);

  }

  getUniversities(countryName: string): Observable<any> {

    return this.http.get(baseUrl + "/universities", {
      params: {
        country: countryName,
      }
    })
  }

  getStates(countryName: string): Observable<any> {
    return this.http.get(baseUrl + "/states", {
      params: {
        country: countryName,
      }
    })
  }


  getCountries(): Observable<any> {
    return this.http.get(baseUrl + "/countries");
  }


  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  upload(file: File) {
    let formData = new FormData();
    formData.append("avatar", file);
    return this.http.post(baseUrl + "/avatar", formData);

  }

  donwload() {
    return this.http.get(baseUrl + "/avatar", { responseType: 'blob' });
  }
}
