import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from '../models/reserva';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private backendURL = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  listarMisReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(
      `${this.backendURL}/reservas/mis-reservas`
    );
  }
}