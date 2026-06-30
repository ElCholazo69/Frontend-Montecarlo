import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cancha } from '../../../models/cancha';
import { Reserva } from '../../../models/reserva';

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
    this.cancha = history.state.reserva.cancha
    this.reserva = history.state.reserva.reserva;
    this.imagen = history.state.reserva.imagen;
    this.precioTotal = history.state.reserva.precioTotal;
  }

  constructor(private fb: FormBuilder) {
    this.formularioPago = this.fb.group({
      nombreTitular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      mes: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])$')]],
      anio: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]]
    });
  }

  onSubmit() {
    if (this.formularioPago.valid) {
      console.log(this.formularioPago.value);

    } else {
      this.formularioPago.markAllAsTouched();
    }
  }

  formatearHora(h: string): string {
    const [hora, minutos] = h.split(':').map(Number);
    const periodo = hora >= 12 ? 'PM' : 'AM';
    const hora12 = hora % 12 || 12;
    return `${hora12}:${minutos.toString().padStart(2, '0')} ${periodo}`;
  }
}