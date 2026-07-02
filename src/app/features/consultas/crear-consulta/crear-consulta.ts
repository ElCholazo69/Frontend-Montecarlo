import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ConsultaService } from '../../../services/consulta.service';
import { ConsultaRegistro } from '../../../models/consulta-registro';


@Component({
  selector: 'app-crear-consulta',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-consulta.html',
  styleUrl: './crear-consulta.scss',
})
export class CrearConsulta {
  formularioConsulta: FormGroup;

  constructor(private fb: FormBuilder, private consultaService: ConsultaService) {

    this.formularioConsulta = this.fb.group({
      asunto: ['', Validators.required],
      mensaje: ['', Validators.required]
    });

  }

  enviarConsulta(): void {

    if (this.formularioConsulta.valid) {
      const consulta: ConsultaRegistro = {
      asunto: this.formularioConsulta.value.asunto,
      mensaje: this.formularioConsulta.value.mensaje
    }
      this.consultaService.crearConsultas(consulta).subscribe({
        next: () =>{
          alert("Consulta enviada correctamente");

          this.formularioConsulta.reset();
        },
        error: (error) =>{
          console.error(error);
          alert('No se pudo enviar la consulta')
        }
      })
    }

  }

}
