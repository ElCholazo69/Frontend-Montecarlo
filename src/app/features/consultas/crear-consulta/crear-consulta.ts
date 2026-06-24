import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-consulta',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './crear-consulta.html',
  styleUrl: './crear-consulta.scss',
})
export class CrearConsulta {
  asunto: string = "";
  mensaje: string = "";

  enviarConsulta(): void{
    if(!this.asunto.trim() || !this.mensaje.trim()){
      alert('Debe completar todos los campos solicitados.');
      return;
    }

    console.log("Consulta enviada");
    console.log({
      asunto: this.asunto,
      mensaje: this.mensaje
    });
  }
}
