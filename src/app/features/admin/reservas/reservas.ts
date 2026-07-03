import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Reserva } from '../../../models/reserva';
import { ReservaService } from '../../../services/reserva.service';
import { CommonModule } from '@angular/common';
import { Historial_Reserva } from '../../../models/historial-reserva';
import { CanchaService } from '../../../services/cancha.service';
import { Cancha } from '../../../models/cancha';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-reservas',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './reservas.html',
  styleUrl: './reservas.scss',
})
export class Reservas implements OnInit{
  mostrarHistorial: boolean = false
  listaReservas:Reserva[]=[]
  canchas:Cancha[]=[]
  usuarios:Usuario[]=[]
  historialReserva:Historial_Reserva[]=[]
  nombreCanchaReservaBuscada:string = ""

  ngOnInit(): void {
    this.actualizarListaReservas()
    this.actualizarListaCanchas()
    this.actualizarListaUsuarios()
  }

  constructor(private reservaService:ReservaService, private canchaService:CanchaService, private usuarioService:UsuarioService){}

  abrirHistorial(){
    this.mostrarHistorial = true;
  }

  cerrarHistorial(){
    this.mostrarHistorial = false;
  }

  formatearHora(h: string): string {
    const [hora, minutos] = h.split(':').map(Number);
    const periodo = hora >= 12 ? 'PM' : 'AM';
    const hora12 = hora % 12 || 12;
    return `${hora12}:${minutos.toString().padStart(2, '0')} ${periodo}`;
  }

  esMayorFechaActual(fecha: string): boolean {
    const hoy = new Date()
    hoy.setHours(0, 0, 0, 0)
    const fechaReserva = new Date(fecha)
    return fechaReserva >= hoy
  }

  obtenerClaseEstado(estado: String){
    if (estado === "CONFIRMADA") {
      return 'confirmado'
    } else{
      if(estado === "CANCELADA"){
        return 'cancelado'
      }else{
        return 'pendiente'
      }
    }
  }

  actualizarListaReservas(){
    this.reservaService.listarReservas().subscribe({
      next: (data) =>{
        this.listaReservas = data
      },
      error: (err) =>{
          console.error(err)
      },
    })
  }

  actualizarListaCanchas(){
    this.canchaService.listarCanchas().subscribe({
      next: (data) => {
        this.canchas = data;
      },
      error: (err) =>{
        console.error(err)
      }
    });
  }

  actualizarListaUsuarios(){
    this.usuarioService.listarUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (err) =>{
        console.error(err)
      }
    })
  }

  actualizarHistorialReserva(idReserva:number){
    this.reservaService.listarHistorialReservas(idReserva).subscribe({
      next: (data) => {
        this.historialReserva.push(...data)
        
      },
      error: (err) =>{
        console.error(err)
      }
    })
  }

  cambiarEstadoComfirmado(reserva:Reserva){
    if (!(reserva.estado === "CONFIRMADA")) {
      const comfirmacion = confirm("El estado se cambiara a comfirmado ¿Esta seguro?")

      if(comfirmacion){
        this.reservaService.actualizarEstado(reserva.id!, "CONFIRMADA").subscribe({
          complete: () =>{
            alert("El estado de la reserva a sido comfirmada correctamente")
            this.actualizarListaReservas()
          },
          error: (err) =>{
            console.error(err)
          }
        })
      }
    }
  }

  cambiarEstadoCancelada(reserva:Reserva){
    if (!(reserva.estado === "CANCELADA")) {
      const comfirmacion = confirm("El estado se cambiara a cancelado ¿Esta seguro?")

      if(comfirmacion){
        this.reservaService.actualizarEstado(reserva.id!, "CANCELADA").subscribe({
          complete: () =>{
            alert("El estado de la reserva a sido cancelada correctamente")
            this.actualizarListaReservas()
          },
          error: (err) =>{
            console.error(err)
          }
        })
      }
    }
  }

  obtenerUsuarioCancha(idReserva:number){
    const reserva = this.listaReservas.find(reserva => reserva.id === idReserva)
    const usuario = this.usuarios.find(usuario => usuario.id === reserva?.usuarioId)
    const cancha = this.canchas.find(cancha => cancha.id === reserva?.canchaId)
    const datos ={
      reserva: reserva,
      usuario: usuario,
      cancha: cancha
    }
    return datos
  }

  buscarHistorialPorNombre() {
    this.historialReserva = [];
    const cancha = this.canchas.find(cancha => cancha.nombre.toLowerCase() === this.nombreCanchaReservaBuscada.toLowerCase().trim())

    if (cancha != undefined) {
      const reservasCancha = this.listaReservas.filter(reserva => reserva.canchaId === cancha.id)

      reservasCancha.forEach(reserva => this.actualizarHistorialReserva(reserva.id!))
    }else{
      alert("No se encontró ninguna cancha con ese nombre")
    } 
  }
}