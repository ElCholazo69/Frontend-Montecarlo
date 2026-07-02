import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Reserva } from '../../../models/reserva';
import { ReservaService } from '../../../services/reserva.service';
import { CommonModule } from '@angular/common';
import { Historial_Reserva } from '../../../models/historial-reserva';

@Component({
  selector: 'app-reservas',
  imports: [RouterModule, CommonModule],
  templateUrl: './reservas.html',
  styleUrl: './reservas.scss',
})
export class Reservas implements OnInit{
  mostrarHistorial: boolean = false;
  listaReservas:Reserva[]=[]
  historialReserva:Historial_Reserva[]=[]

  ngOnInit(): void {
    this.actualizarListaReservas()
  }

  constructor(private reservaService:ReservaService){}

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
    if (estado === "COMFIRMADA") {
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
  
  actualizarHistorialReserva(idReserva:number){
    this.reservaService.listarHistorialReservas(idReserva).subscribe({
      next: (data) => {
        this.historialReserva = data
      },
      error: (err) =>{
        console.error(err)
      }
    })
  }

  cambiarEstadoComfirmado(reserva:Reserva){
    if (!(reserva.estado === "COMFIRMADA")) {
      const comfirmacion = confirm("El estado se cambiara a comfirmado ¿Esta seguro?")

      if(comfirmacion){
        this.reservaService.actualizarEstado(reserva.id!, "COMFIRMADA").subscribe({
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
}