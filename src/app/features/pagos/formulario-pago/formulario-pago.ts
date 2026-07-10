import { Component, OnInit, } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cancha } from '../../../models/cancha';
import { PagoRegistro } from '../../../models/pago-registro';
import { Reserva } from '../../../models/reserva';
import { PagoService } from '../../../services/pago.service';

@Component({
  selector: 'app-formulario-pago',
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-pago.html',
  styleUrl: './formulario-pago.scss',
})
export class FormularioPago implements OnInit{
  formularioPago: FormGroup;
  cancha?: Cancha;
  reserva?: Reserva;
  imagen: string = "";
  precioTotal: number = 0;
  
  ngOnInit(): void {
      if (!history.state.datosReserva) {
      this.router.navigate(['/canchas']);
      return;
    }

    const datos = history.state.datosReserva;

    this.cancha = datos.cancha;
    this.imagen = datos.imagen;
    this.precioTotal = datos.precioTotal;

    this.reserva = {
      fecha: datos.fecha,
      horaInicio: datos.horaInicio,
      horaFin: datos.horaFin,
      canchaId: datos.canchaId,
      estado: '',
      usuarioId: 0
    };
  }

  constructor(private fb: FormBuilder, private pagoService: PagoService, private router: Router) {
    this.formularioPago = this.fb.group({
      nombreTitular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      mes: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])$')]],
      anio: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]]
    });
  }

  onSubmit() {
      if (!this.formularioPago.valid) {
      this.formularioPago.markAllAsTouched();
      return;
    }

    const pago: PagoRegistro = {

      canchaId: this.reserva!.canchaId,

      fecha: this.reserva!.fecha,

      horaInicio: this.reserva!.horaInicio,

      horaFin: this.reserva!.horaFin,

      numeroTarjeta: this.formularioPago.value.numeroTarjeta,

      nombreTitular: this.formularioPago.value.nombreTitular,

      cvv: this.formularioPago.value.cvv,

      fechaExpiracion:
        `${this.formularioPago.value.mes}/${this.formularioPago.value.anio.slice(-2)}`

    };

    this.pagoService.procesarPago(pago).subscribe({

      next: (respuesta) => {

        alert("Pago realizado correctamente.");

        console.log(respuesta);

        this.router.navigate(['/reservas']);

      },

      error: (error) => {

        if (error.status === 400) {
          alert(error.error.mensaje);
          return;
        }
        
        alert("No se pudo procesar el pago.");

      }

    });
  }

  formatearHora(h: string): string {
    const [hora, minutos] = h.split(':').map(Number);
    const periodo = hora >= 12 ? 'PM' : 'AM';
    const hora12 = hora % 12 || 12;
    return `${hora12}:${minutos.toString().padStart(2, '0')} ${periodo}`;
  }
}