import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {urls} from '../config/urls';
import {CrudService} from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class QrcodeService {

  constructor(
    private http: HttpClient,
    private crudService: CrudService)
  {  }

  generateCode(body: { url: string }): Observable<{ base64Png: string }> {
    return this.crudService.create<{ base64Png: string }>(urls.generate, body);
  }

  readCode(image: any): Observable<any> {
    return this.http.post(urls.read, image)
  }
}
