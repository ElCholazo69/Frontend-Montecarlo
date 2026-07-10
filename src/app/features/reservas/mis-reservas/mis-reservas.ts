import { Component } from '@angular/core';
import { Reserva } from '../../../models/reserva';
import { ReservaService } from '../../../services/reserva.service';
import { Cancha } from '../../../models/cancha';
import { CanchaService } from '../../../services/cancha.service';
import { DetalleReserva } from "../detalle-reserva/detalle-reserva";

@Component({
  selector: 'app-mis-reservas',
  imports: [DetalleReserva],
  templateUrl: './mis-reservas.html',
  styleUrl: './mis-reservas.scss',
})
export class MisReservas {
  reservas: Reserva[]= [];
  mostrarModal = false;
  reservaSeleccionada?: Reserva;
  canchaSeleccionada?: Cancha;

numeroReservaSeleccionada = 0;

  constructor(private reservaService: ReservaService, private canchaService: CanchaService){}

  ngOnInit(): void{
    this.reservaService.listarMisReservas().subscribe({
      next:rep =>{
        this.reservas = rep;
      },

      error: (error) =>{
        console.error(error);
        alert("No se pudieron cargar las reservas.")
      }
    });
  }

  abrirModal(reserva: Reserva, indice: number): void {

    this.reservaSeleccionada = reserva;

    this.numeroReservaSeleccionada = indice+1;

    this.canchaService.obtenerCanchaPorId(reserva.canchaId!).subscribe({

      next: (cancha) => {

        this.canchaSeleccionada = cancha;

        this.mostrarModal = true;

      },

      error: (error) => {

        console.error(error);

        alert("No se pudo obtener la información de la cancha.");

      }

    });

  }

  cerrarModal(): void {
  this.mostrarModal = false;
  }
}
