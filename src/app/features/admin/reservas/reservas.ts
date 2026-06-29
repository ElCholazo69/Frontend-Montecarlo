import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reservas',
  imports: [RouterModule],
  templateUrl: './reservas.html',
  styleUrl: './reservas.scss',
})
export class Reservas {
  mostrarHistorial: boolean = false;

  abrirHistorial(){
    this.mostrarHistorial = true;
  }

  cerrarHistorial(){
    this.mostrarHistorial = false;
  }
}
