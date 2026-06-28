import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-detalle-cancha',
  imports: [ReactiveFormsModule],
  templateUrl: './detalle-cancha.html',
  styleUrl: './detalle-cancha.scss',
})
export class DetalleCancha {
  formularioReserva: FormGroup;
  fechaMinima: string;

  constructor(private fb: FormBuilder) {
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
      if (fecha === this.fechaMinima) {
        const [hInicio, mInicio] = horaInicio.split(':').map(Number);
        const minutosTotalesActuales = ahora.getHours() * 60 + ahora.getMinutes();
        const minutosTotalesInicio = hInicio * 60 + mInicio;

        if (minutosTotalesInicio <= minutosTotalesActuales) {
          alert('No puedes reservar en una hora pasada');
          return;
        }
      }

      console.log(this.formularioReserva.value);
    } else {
      this.formularioReserva.markAllAsTouched();
    }
  }
}