import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router} from "@angular/router";
import { Cancha } from '../../../models/cancha';

@Component({
  selector: 'app-detalle-cancha',
  imports: [ReactiveFormsModule],
  templateUrl: './detalle-cancha.html',
  styleUrl: './detalle-cancha.scss',
})
export class DetalleCancha implements OnInit{
  cancha?:Cancha;
  imagen: string = "";
  formularioReserva: FormGroup;
  fechaMinima: string;

  constructor(private fb: FormBuilder, private router: Router) {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    this.fechaMinima = `${año}-${mes}-${dia}`;
    
    this.formularioReserva = this.fb.group({
      fecha: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFin: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if(!history.state.reserva){
      this.router.navigate(['/canchas']);
      return;
    }

    this.cancha = history.state.reserva.cancha
    this.imagen = history.state.reserva.imagen
  }
  
  onSubmit() {
    if (this.formularioReserva.valid) {
      const { fecha, horaInicio, horaFin } = this.formularioReserva.value;
      const fechaSeleccionada = new Date(fecha + 'T00:00:00');
      const hoy = new Date();
      hoy.setHours(0,0,0,0);

      if (fechaSeleccionada < hoy) {
        alert('No puedes reservar en una fecha pasada');
        return;
      }

      if (horaInicio >= horaFin) {
        alert('La hora fin debe ser mayor a la hora inicio');
        return;
      }

      const ahora = new Date();
      const [hInicio, mInicio] = horaInicio.split(':').map(Number);
      const [hFin, mFin] = horaFin.split(':').map(Number);
      if (fecha === this.fechaMinima) {
        const minutosTotalesActuales = ahora.getHours() * 60 + ahora.getMinutes();
        const minutosTotalesInicio = hInicio * 60 + mInicio;

        if (minutosTotalesInicio <= minutosTotalesActuales) {
          alert('No puedes reservar en una hora pasada');
          return;
        }
      }

      const inicio = hInicio + (mInicio / 60);
      const fin = hFin + (mFin / 60);

      if (fin <= inicio) {
      alert('La duración de la reserva debe ser mayor a 0 minutos.');
      return;
    }

      const precioHora = this.cancha?.precioHora ?? 0;
      const precioTotal = Number(((fin - inicio) * precioHora).toFixed(2));

      const datosReserva ={
        canchaId: this.cancha?.id,
        fecha,
        horaInicio,
        horaFin,
        cancha: this.cancha,
        imagen: this.imagen,
        precioTotal
      };
      console.log(this.cancha);
      this.router.navigate(['/pago'], {
        state: {
          datosReserva
        }
      });

    } else {

      this.formularioReserva.markAllAsTouched();

    }
  }
}