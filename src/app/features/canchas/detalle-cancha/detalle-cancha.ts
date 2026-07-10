import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, ReactiveFormsModule, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router} from "@angular/router";
import { Cancha } from '../../../models/cancha';
import { Configuracion } from '../../../models/configuracion';
import { ConfiguracionService } from '../../../services/configuracion.service';

@Component({
  selector: 'app-detalle-cancha',
  imports: [ReactiveFormsModule],
  templateUrl: './detalle-cancha.html',
  styleUrl: './detalle-cancha.scss',
})
export class DetalleCancha implements OnInit{
  cancha?:Cancha;
  imagen: string = "";
  configuracion?: Configuracion;
  formularioReserva: FormGroup;
  fechaMinima: string;
  horariosDisponibles: string[] = []

  constructor(private fb: FormBuilder, private router: Router, private configuracionService: ConfiguracionService) {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    this.fechaMinima = `${año}-${mes}-${dia}`;
    
    this.formularioReserva = this.fb.group({
        fecha: ['', Validators.required],
        horaInicio: ['', Validators.required],
        horaFin: ['', Validators.required]
      },
      {
        validators: this.validarHorario()
      }
    );
  }

  ngOnInit(): void {
    if(!history.state.reserva){
      this.router.navigate(['/canchas']);
      return;
    }

    this.cancha = history.state.reserva.cancha
    this.imagen = history.state.reserva.imagen

    this.configuracionService.obtenerConfiguracion().subscribe({
      next: (configuracion) => {
        this.configuracion = configuracion;
        this.generarHorarios();
      }
    })
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

      const ahora = new Date();

      const [hInicio, mInicio] = horaInicio.split(':').map(Number);
      const [hFin, mFin] = horaFin.split(':').map(Number);

      const inicioMinutos = hInicio * 60 + mInicio;
      const finMinutos = hFin * 60 + mFin;

      if (this.configuracion) {

        const [ha, ma] = this.configuracion.horaApertura.split(':').map(Number);
        const [hc, mc] = this.configuracion.horaCierre.split(':').map(Number);

        const aperturaMinutos = ha * 60 + ma;
        const cierreMinutos = hc * 60 + mc;

        if (inicioMinutos < aperturaMinutos) {
          alert(`El club abre a las ${this.configuracion.horaApertura.substring(0, 5)}`);
          return;
        }

        if (finMinutos > cierreMinutos) {
          alert(`El club cierra a las ${this.configuracion.horaCierre.substring(0, 5)}`);
          return;
        }

      }

      if (fecha === this.fechaMinima) {

          const minutosTotalesActuales =
            ahora.getHours() * 60 + ahora.getMinutes();

          if (inicioMinutos <= minutosTotalesActuales) {
            alert('No puedes reservar en una hora pasada');
            return;
          }

      }

      const duracion = finMinutos - inicioMinutos
      const precioHora = this.cancha?.precioHora ?? 0;
      const precioTotal = Number(((duracion/60) * precioHora).toFixed(2));

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

  private generarHorarios(): void {
      if (!this.configuracion) {
        return;
      }

      const horarios: string[] = [];
      let [hora, minuto] = this.configuracion.horaApertura.split(':').map(Number);
      const [horaFin, minutoFin] = this.configuracion.horaCierre.split(':').map(Number);

      while (hora < horaFin || (hora === horaFin && minuto <= minutoFin)) {
        horarios.push(`${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`);

        minuto += this.configuracion.intervaloReserva;

        while (minuto >= 60) {
          minuto -= 60;
          hora++;
        }

      }
      this.horariosDisponibles = horarios;
    }

    private validarHorario(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {

      const horaInicio = control.get('horaInicio')?.value
      const horaFin = control.get('horaFin')?.value

      if (!horaInicio || !horaFin) {
        return null
      }

      return horaInicio >= horaFin
        ? { horarioInvalido: true }
        : null

    }
  }

}