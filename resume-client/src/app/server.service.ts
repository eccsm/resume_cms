import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) {
  }

  private async request(method: string, url: string, data?: any) {

    const result = this.http.request(method, url, {
      body: data,
      responseType: 'json',
      observe: 'body'
    });
    return new Promise((resolve, reject) => {
      result.subscribe(resolve, reject);
    });
  }

  getResume() {
    return this.request('GET', `${environment.serverUrl}/resume`);
  }

  createResume(resume:any) {
    return this.request('POST', `${environment.serverUrl}/resume`, resume);
  }

  updateResume(resume:any) {
    return this.request('PUT', `${environment.serverUrl}/resume/${resume.id}`, resume);
  }

  deleteResume(resume:any) {
    return this.request('DELETE', `${environment.serverUrl}/resume/${resume.id}`);
  }
}