import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consulta } from '../models/consulta';
import { ConsultaRegistro } from '../models/consulta-registro';
import { RespuestaConsulta } from '../models/respuesta-consulta';


@Injectable({
  providedIn: 'root',
})
export class ConsultaService {
  private backendURL = "http://localhost:8080"

  constructor(private http:HttpClient){}

  listarConsultasAdmin():Observable<Consulta[]>{
    return this.http.get<Consulta[]>(`${this.backendURL}/consultas`)
  }

  listarConsultasUsuario():Observable<Consulta[]>{
    return this.http.get<Consulta[]>(`${this.backendURL}/consultas/mis-consultas`)
  }

  crearConsultas(consulta:ConsultaRegistro):Observable<Consulta>{
    return this.http.post<Consulta>(`${this.backendURL}/consultas`, consulta)
  }

  obtenerConsultaPorId(id:number):Observable<Consulta>{
    return this.http.get<Consulta>(`${this.backendURL}/consultas/${id}`)
  }

  responderConsulta(id:number, respuesta: RespuestaConsulta): Observable<Consulta>{
    return this.http.patch<Consulta>(`${this.backendURL}/consultas/${id}/responder`,respuesta);
  }

  eliminarConsulta(id:number):Observable<void>{
    return this.http.delete<void>(`${this.backendURL}/consultas/${id}`)
  }
}