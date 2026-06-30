import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router} from "@angular/router";
import { Cancha } from '../../../models/cancha';
import { Reserva } from '../../../models/reserva';

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
  precioTotal?: number;

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

      const cancha = this.cancha;
      const reserva:Reserva ={
        estado: "ACTIVA",
        fecha: fecha,
        hora_fin: horaFin,
        hora_inicio: horaInicio,
        cancha_id: this.cancha?.id_cancha ?? 1,
        usuario_id: 1
      };
      const imagen = this.imagen;
      const total = this.cancha?.precioHora ?? 0;
      const inicio = hInicio + (mInicio / 60);
      const fin = hFin + (mFin / 60);
      const horas = fin - inicio;
      const precioTotal = parseFloat((total * horas).toFixed(2));
      this.router.navigate(['/pago'], {
        state: {
          reserva: { cancha, reserva, imagen, precioTotal}
        }
      });
      
    } else {
      this.formularioReserva.markAllAsTouched();
    }
  }
}