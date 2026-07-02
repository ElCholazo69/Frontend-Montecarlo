import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from '../models/reserva';
import { Historial_Reserva } from '../models/historial-reserva';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private backendURL = "http://localhost:8080"

  constructor(private http:HttpClient){}

  //Usuario
  listarMisReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.backendURL}/reservas/mis-reservas`);
  }

  //Admin
  listarReservas():Observable<Reserva[]>{
    return this.http.get<Reserva[]>(`${this.backendURL}/reservas`)
  }

  crearReserva(reserva:Reserva):Observable<Reserva>{
    return this.http.post<Reserva>(`${this.backendURL}/reservas`, reserva)
  }
  
  obtenerReservaPorId(id:number):Observable<Reserva>{
    return this.http.get<Reserva>(`${this.backendURL}/reservas/${id}`)
  }

  editarReserva(id:number, reserva:Reserva):Observable<Reserva>{
    return this.http.put<Reserva>(`${this.backendURL}/reservas/${id}`, reserva)
  }

  eliminarReserva(id:number):Observable<void>{
    return this.http.delete<void>(`${this.backendURL}/reservas/${id}`)
  }
  
  actualizarEstado(id:number, estado:string):Observable<Reserva>{
    return this.http.patch<Reserva>(`${this.backendURL}/reservas/${id}/estado?estado=${estado}`, {});
  }

  listarHistorialReservas(idReserva:number): Observable<Historial_Reserva[]> {
    return this.http.get<Historial_Reserva[]>(`${this.backendURL}/historial/${idReserva}`);
  }
}