import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cancha } from '../models/cancha';

@Injectable({
  providedIn: 'root',
})

export class CanchaService {
  private backendURL = "http://localhost:8080"

  constructor(private http:HttpClient){}

  //Usuario
  listarCanchas():Observable<Cancha[]>{
    return this.http.get<Cancha[]>(`${this.backendURL}/canchas`)
  }

  //Admin
  crearCancha(cancha:Cancha):Observable<Cancha>{
    return this.http.post<Cancha>(`${this.backendURL}/canchas`, cancha)
  }

  obtenerCanchaPorId(id:number):Observable<Cancha>{
    return this.http.get<Cancha>(`${this.backendURL}/canchas/${id}`)
  }

  editarCancha(id:number, cancha:Cancha):Observable<Cancha>{
    return this.http.put<Cancha>(`${this.backendURL}/canchas/${id}`, cancha)
  }

  eliminarCancha(id:number):Observable<void>{
    return this.http.delete<void>(`${this.backendURL}/canchas/${id}`)
  }
}