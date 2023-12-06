import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  constructor(private _http: HttpClient) { }

  individual1(data: any): Observable<any> {
    // Your logic here
    return this._http.post('http://localhost:3000/worker', data);
  }

  addWorker(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/worker', data);
  }

  updateWorker(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/worker/${id}`, data);
  }

  getWorkerList(): Observable<any> {
    return this._http.get('http://localhost:3000/worker');
  }

  deleteWorker(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/worker/${id}`)
  }





}
