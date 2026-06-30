import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../models/login';
import { Auth } from '../models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private backendURL = "http://localhost:8080"

  constructor(private http:HttpClient){}

  generarToken(login:Login):Observable<Auth>{
    return this.http.post<Auth>(`${this.backendURL}/auth/login`, login)
  }
}