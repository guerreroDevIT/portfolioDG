import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Presentacion } from '../model/presentacion';

@Injectable({
  providedIn: 'root'
})
export class PresentacionService {



  URL = environment.URL + 'presentacion/';


  constructor(private httpClient : HttpClient) { }

  public lista(): Observable<Presentacion[]>{
    return this.httpClient.get<Presentacion[]>(this.URL + 'lista');
  }

  public detail(id: number): Observable<Presentacion>{
    return this.httpClient.get<Presentacion>(this.URL + `detail/${id}`);
  }

  public save(presentacion: Presentacion): Observable<any>{
    return this.httpClient.post<any>(this.URL + 'create', presentacion);
  }

  public update(id: number, presentacion: Presentacion): Observable<any>{
    return this.httpClient.put<any>(this.URL + `update/${id}`, presentacion);
  }

  public delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.URL + `delete/${id}`);
  }
}
