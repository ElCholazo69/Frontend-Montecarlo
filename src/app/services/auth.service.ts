import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Login_Model } from '../models/login-model';
import { Auth } from '../models/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private backendURL = "http://localhost:8080"

  constructor(private http:HttpClient, private router: Router){}

  generarToken(login: Login_Model): Observable<Auth> {
    return this.http.post<Auth>(`${this.backendURL}/auth/login`, login).pipe(
      tap((respuesta: Auth) => {
        if (respuesta && respuesta.token) {
          localStorage.setItem('token', respuesta.token); 
        }
      })
    );
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']); 
  }
}