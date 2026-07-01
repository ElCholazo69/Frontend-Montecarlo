import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-canchas',
  imports: [RouterModule],
  templateUrl: './canchas.html',
  styleUrl: './canchas.scss',
})
export class Canchas {
  mostrarTabla: boolean = false;
  esEdicion: boolean = false;

  abrirTablaCrear(){
    this.esEdicion = false;
    this.mostrarTabla = true;
  }

  mostrarTablaEditar(){
    this.esEdicion = true;
    this.mostrarTabla = true;
  }

  cerrarTabla(){
    this.mostrarTabla = false;
  }
}
