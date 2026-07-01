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

  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  salir(): void {
    this.menuAbierto = false;
    this.authService.cerrarSesion();
  }
}