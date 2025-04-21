import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {urls} from '../config/urls';

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {

  constructor(private http:HttpClient) { }

  generateCode(data:any):Observable<any>{
    return this.http.post(urls.generate, data)
  }

  readCode(image:any):Observable<any>{
    return this.http.post(urls.read, image)
  }
}
