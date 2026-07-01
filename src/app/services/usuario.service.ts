import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private backendURL = "http://localhost:8080"

  constructor(private http:HttpClient){}

  //Usuario
  crearUsuario(usuario:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(`${this.backendURL}/usuarios`, usuario)
  }

  listarUsuarios():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.backendURL}/usuarios`)
  }

  //Admin
  editarUsuario(id:number, usuario:Usuario):Observable<Usuario>{
    return this.http.put<Usuario>(`${this.backendURL}/usuarios/${id}`, usuario)
  }
  
  eliminarUsuario(id:number):Observable<void>{
    return this.http.delete<void>(`${this.backendURL}/usuarios/${id}`)
  }

  obtenerUsuarioPorId(id:number):Observable<Usuario>{
    return this.http.get<Usuario>(`${this.backendURL}/usuarios/${id}`)
  }
}