import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-pago',
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-pago.html',
  styleUrl: './formulario-pago.scss',
})
export class FormularioPago implements OnInit{
  formularioPago: FormGroup;
  reserva: any;
  
  ngOnInit(): void {
    this.reserva = history.state.reserva;
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
}