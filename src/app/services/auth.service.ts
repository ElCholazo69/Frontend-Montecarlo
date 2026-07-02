import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Login_Model } from '../models/login-model';
import { Auth } from '../models/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private backendURL = "http://localhost:8080"

  private readonly tokenSignal = signal<string | null>(
    localStorage.getItem('token')
  );

  private readonly rolSignal = signal<string | null>(
    this.extraerRolDelToken(localStorage.getItem('token'))
  );

  readonly logueadoSignal = computed(() => this.tokenSignal() !== null);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  generarToken(login: Login_Model): Observable<Auth> {
    return this.http.post<Auth>(`${this.backendURL}/auth/login`, login)
      .pipe(tap((respuesta: Auth) => {
          if (respuesta?.token) {
            localStorage.setItem('token', respuesta.token);
            this.tokenSignal.set(respuesta.token);
            this.rolSignal.set(this.extraerRolDelToken(respuesta.token));
          }
        })
      );
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
    this.tokenSignal.set(null);
    this.rolSignal.set(null);
    this.router.navigate(['/']);
  }

  obtenerToken(): string | null {
    return this.tokenSignal();
  }

  obtenerRol(): string | null {
    return this.rolSignal();
  }

  isAdmin(): boolean {
    return this.rolSignal() === 'ADMIN';
  }

  isCliente(): boolean {
    return this.rolSignal() === 'CLIENTE';
  }

  private extraerRolDelToken(token: string | null): string | null {
    if (!token) {
      return null;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role ?? null;
    } catch {
      return null;
    }
  }
}