import { Component } from '@angular/core';
import { RouterLink,Router } from '@angular/router';
import { Cancha } from '../../../models/cancha';
import { CanchaService } from '../../../services/cancha.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.scss',
})
export class Inicio {
  canchasDestacadas: Cancha[] = []
  imagen: string = "https://static.vecteezy.com/system/resources/thumbnails/000/104/368/small/free-soccer-field-vector.jpg"

  constructor(private canchaService: CanchaService, private router: Router, private authService:AuthService){}

  ngOnInit(): void{
    this.canchaService.listarCanchas().subscribe({
      next: (canchas) =>{
        this.canchasDestacadas = canchas.slice(-5).reverse()
      },
      error: (err) => {
        console.error(err)
      }
    });
  }

  reservar(cancha: Cancha): void {
    if (!this.authService.logueadoSignal()) {

      this.router.navigate(['/login'], {
        queryParams: {
          mensaje: 'reserva'
        }
      });
      return;
    }

    const imagen = this.imagen
    this.router.navigate(['/Dcanchas'], {
      state: {
        reserva: { cancha, imagen}
      }
    });
  }

}
