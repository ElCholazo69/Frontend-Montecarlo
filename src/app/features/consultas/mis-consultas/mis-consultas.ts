import { Component, OnInit } from '@angular/core';
import { DatePipe,NgClass } from '@angular/common';
import { Consulta } from '../../../models/consulta';
import { ConsultaService } from '../../../services/consulta.service';

@Component({
  selector: 'app-mis-consultas',
  imports: [DatePipe,NgClass],
  templateUrl: './mis-consultas.html',
  styleUrl: './mis-consultas.scss',
})
export class MisConsultas implements OnInit{
  consultas: Consulta[] = [];

  consultaSeleccionada: Consulta | null = null;

  constructor(private consultaService: ConsultaService) {}

  ngOnInit(): void {
    this.listarConsultas();
  }

  listarConsultas(): void {
    this.consultaService.listarConsultasUsuario().subscribe({
      next: (data) => {
        this.consultas = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  abrirDetalle(consulta: Consulta): void {
    this.consultaSeleccionada = consulta;
  }

  cerrarDetalle(): void {
    this.consultaSeleccionada = null;
  }

}
