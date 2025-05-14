import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CrudService} from './crud.service';
import {urls} from '../config/urls';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(
    private http: HttpClient,
    private crud: CrudService
  ) {
  }


  sendStatistics(data: any) {
    return this.crud.create(urls.sendStatistics, data)
  }


}
