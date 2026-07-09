import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dashboard } from '../models/dashboard';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private backendURL = "http://localhost:8080"

  constructor(private http: HttpClient){}

  obtenerDashboard() : Observable<Dashboard>{
    return this.http.get<Dashboard>(`${this.backendURL}/dashboard`)
  }
}
