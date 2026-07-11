import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  imports: [RouterModule, CommonModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss',
})
export class Usuarios implements OnInit{
  listaUsuarios:Usuario[] = []

  ngOnInit(): void {
    this.listarUsuario()
  }

  constructor(private usuarioService:UsuarioService){}

  listarUsuario(){
    this.usuarioService.listarUsuarios().subscribe({
      next: (data) =>{
        this.listaUsuarios = data
      },
      error: (err) =>{
        console.error(err)
      }
    })
  }

  obtenerClaseRol(rol:string){
    if (rol == "CLIENTE") {
      return "disponible"
    } else {
      return "bloqueado"
    }
  }

  eliminarUsuario(idUsuario:number){
    const comfirmacion = confirm("¿Seguro que desea eliminar a este usuario?")
    if (comfirmacion) {
      this.usuarioService.eliminarUsuario(idUsuario).subscribe({
        error: (err) =>{
          console.error(err)
        },
        complete:() =>{
          this.listarUsuario()
        }
      })
    }
  }
}