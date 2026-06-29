import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router} from "@angular/router";

@Component({
  selector: 'app-detalle-cancha',
  imports: [ReactiveFormsModule],
  templateUrl: './detalle-cancha.html',
  styleUrl: './detalle-cancha.scss',
})
export class DetalleCancha {
  formularioReserva: FormGroup;
  fechaMinima: string;
  nombreCancha: string = "Fútbol 7";
  total: number = 80;
  precioTotal?: number;
  imagen: string = "https://static.vecteezy.com/system/resources/thumbnails/000/104/368/small/free-soccer-field-vector.jpg";

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
      if (fecha === this.fechaMinima) {
        const minutosTotalesActuales = ahora.getHours() * 60 + ahora.getMinutes();
        const minutosTotalesInicio = hInicio * 60 + mInicio;

        if (minutosTotalesInicio <= minutosTotalesActuales) {
          alert('No puedes reservar en una hora pasada');
          return;
        }
      }

      const nombreCancha = this.nombreCancha;
      const imagen = this.imagen;
      const [hFin, mFin] = horaFin.split(':').map(Number);
      const inicio = hInicio + (mInicio / 60);
      const fin = hFin + (mFin / 60);
      const horas = fin - inicio;
      const precioTotal = parseFloat((this.total * horas).toFixed(2));
      this.router.navigate(['/pago'], {
        state: {
          reserva: {fecha, horaInicio, horaFin, nombreCancha, precioTotal, imagen}
        }
      });
      
    } else {
      this.formularioReserva.markAllAsTouched();
    }
  }
}