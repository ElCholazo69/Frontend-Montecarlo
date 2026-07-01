import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';


@Component({
  selector: 'app-registro',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.scss',
})
export class Registro {
  formularioRegistro: FormGroup

  constructor(private fb: FormBuilder, private usuarioService:UsuarioService, private router:Router) {
    this.formularioRegistro = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[9][0-9]{8}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.formularioRegistro.valid) {
      const usuario:Usuario = {
        apellido: this.formularioRegistro.value.apellido,
        correo: this.formularioRegistro.value.correo,
        nombre: this.formularioRegistro.value.nombre,
        password: this.formularioRegistro.value.password,
        rol: 'CLIENTE',
        telefono: this.formularioRegistro.value.telefono
      }

      this.usuarioService.crearUsuario(usuario).subscribe({
        next: (data) => {
          this.router.navigate(['/login'])
        },
        error: (err) =>{
          console.error(err)
        }
      })
    } else {
      this.formularioRegistro.markAllAsTouched();
    }
  }
}