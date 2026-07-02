import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink,ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Login_Model } from '../../../models/login-model';
import { Auth } from '../../../models/auth';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit { 
  formularioLogin: FormGroup;
  mensaje: string ="";

  constructor(private fb: FormBuilder, private authService:AuthService, private router:Router, private route: ActivatedRoute) {
    this.formularioLogin = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {

  this.route.queryParams.subscribe(params => {

    if (params['mensaje'] === 'reserva') {

      this.mensaje = 'Debes iniciar sesión para realizar una reserva.';

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {},
        replaceUrl: true
      });

    }

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
          
          if(this.authService.isAdmin()){
            this.router.navigate(['/admin/canchas'])
          }else{
            this.router.navigate(['/'])
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