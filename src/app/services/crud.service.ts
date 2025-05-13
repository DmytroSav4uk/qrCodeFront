import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) {}

  create<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(url, data);
  }

  read<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  update<T>(url: string, data: any): Observable<T> {
    return this.http.put<T>(url, data);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }

}
