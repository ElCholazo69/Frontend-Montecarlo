import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Login_Model } from '../../../models/login-model';
import { Auth } from '../../../models/auth';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login { 
  formularioLogin: FormGroup;

  constructor(private fb: FormBuilder, private authService:AuthService, private router:Router) {
    this.formularioLogin = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.formularioLogin.valid) {
      const login:Login_Model = {
        correo: this.formularioLogin.value.correo,
        password: this.formularioLogin.value.password
      }

      this.authService.generarToken(login).subscribe({
        next: (data) =>{
          console.log("Token: "+ data.token)
          
          const auth:Auth ={
            token: data.token
          }
        },
        error: (err) =>{
          console.error(err)
        }
      })
    } else {
      this.formularioLogin.markAllAsTouched();
    }
  }
}