import { Component } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Configuracion } from '../../../models/configuracion';
import { ConfiguracionService } from '../../../services/configuracion.service';

@Component({
  selector: 'app-configuracion-admin',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './configuracion-admin.html',
  styleUrl: './configuracion-admin.scss',
})
export class ConfiguracionAdmin {
  configuracion !: Configuracion
  formConfiguracion!: FormGroup

  constructor(private fb: FormBuilder, private configuracionService: ConfiguracionService){}

    ngOnInit(): void {

      const opciones: AbstractControlOptions = {
        validators: this.validarHorario()
      };

      this.formConfiguracion = this.fb.group(
        {
          horaApertura: ['', Validators.required],
          horaCierre: ['', Validators.required],
          intervaloReserva: ['', Validators.required]
        },
        opciones
      )
      this.obtenerConfiguracion();
    }
  
    obtenerConfiguracion(): void {

      this.configuracionService.obtenerConfiguracion().subscribe({

        next: (data) => {

          this.configuracion = data;

          this.formConfiguracion.patchValue({
            horaApertura: data.horaApertura.substring(0, 5),
            horaCierre: data.horaCierre.substring(0, 5),
            intervaloReserva: data.intervaloReserva
          })

        },
        error: (err) => {
          console.error(err);
        }
      })
    }

    validarHorario() {
      return (control: AbstractControl): ValidationErrors | null => {

        const apertura = control.get('horaApertura')?.value;
        const cierre = control.get('horaCierre')?.value;

        if (!apertura || !cierre) {
          return null;
        }

        return cierre > apertura
          ? null
          : { horarioInvalido: true };

      }
    }

    guardarConfiguracion(){
        if (this.formConfiguracion.invalid) {
        this.formConfiguracion.markAllAsTouched();
        return;
      }

      const configuracion: Configuracion = {
        id: this.configuracion?.id,
        horaApertura: this.formConfiguracion.value.horaApertura!,
        horaCierre: this.formConfiguracion.value.horaCierre!,
        intervaloReserva: Number(this.formConfiguracion.value.intervaloReserva),
        activo: this.configuracion?.activo ?? true
      };

      this.configuracionService.actualizarConfiguracion(configuracion).subscribe({

          next: (respuesta) => {
            this.configuracion = respuesta;
            this.formConfiguracion.patchValue({
              horaApertura: respuesta.horaApertura,
              horaCierre: respuesta.horaCierre,
              intervaloReserva: respuesta.intervaloReserva
            });
            alert("La configuración del club se actualizó correctamente.");
          },
          error: () => {
            alert("No se pudo actualizar la configuración del club.");
          }
      })
  }
}
