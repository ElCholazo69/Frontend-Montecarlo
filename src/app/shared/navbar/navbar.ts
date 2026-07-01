import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  menuAbierto = false;

   constructor(public authService: AuthService) {} 

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  estaLogueado():boolean{
    return !!localStorage.getItem('token');
  }

  salir(){
    this.menuAbierto = false;
    this.authService.cerrarSesion();
  }
}