import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Consulta } from '../../../models/consulta';
import { ConsultaService } from '../../../services/consulta.service';

@Component({
  selector: 'app-consultas',
  imports: [RouterModule,DatePipe,ReactiveFormsModule],
  templateUrl: './consultas.html',
  styleUrl: './consultas.scss',
})
export class Consultas {
  consultas: Consulta[] = [];
  consultaSeleccionada: Consulta | null = null;
  formRespuesta!: FormGroup;

  constructor (private fb: FormBuilder, private consultaService : ConsultaService){}


  ngOnInit(): void {
    this.formRespuesta = this.fb.group({
      respuesta: [
        '',
        [Validators.required, Validators.minLength(10), Validators.maxLength(500)]
      ]
    });

    this.listarConsultas();

  }

  listarConsultas(): void{
    this.consultaService.listarConsultasAdmin().subscribe({
      next: (data) => {
        this.consultas = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  abrirModal(consulta: Consulta): void {
    this.consultaSeleccionada = consulta;
    this.formRespuesta.reset();
  }

  cerrarModal(): void {
    this.consultaSeleccionada = null;
    this.formRespuesta.reset();
  }

  eliminarConsulta(id: number): void {

    const confirmar = confirm("¿Está seguro de eliminar esta consulta? Esta acción no se puede deshacer.");
    if (!confirmar) {
      return;
    }

    this.consultaService.eliminarConsulta(id).subscribe({
      next: () => {
        alert("La consulta fue eliminada correctamente.");
        this.listarConsultas();
      },
      error: (err) => {
        console.error(err);
        alert("Ocurrió un error al eliminar la consulta.");
      }
    });

  }

  responderConsulta(): void {

    if (this.formRespuesta.invalid || !this.consultaSeleccionada) {
      this.formRespuesta.markAllAsTouched();
      return;
    }

    this.consultaService.responderConsulta(this.consultaSeleccionada.id!,this.formRespuesta.value).subscribe({
      next: () => {
        alert("La respuesta fue enviada correctamente al cliente.")
        this.listarConsultas();
        this.cerrarModal();
      },
      error: (err) => {
        console.error(err);
        alert("Ocurrió un error al enviar la respuesta.")
      }

    });

  }
  
}
