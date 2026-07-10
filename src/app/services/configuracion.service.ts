import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuracion } from '../models/configuracion';

@Injectable({
  providedIn: 'root',
})
export class ConfiguracionService {
  private backendURL = "http://localhost:8080"

  constructor(private http:HttpClient){}

  obtenerConfiguracion(): Observable<Configuracion>{
    return this.http.get<Configuracion>(`${this.backendURL}/configuracion`)
  }

  actualizarConfiguracion(configuracion: Configuracion): Observable<Configuracion>{
    return this.http.put<Configuracion>(`${this.backendURL}/configuracion`, configuracion)
  }
}
