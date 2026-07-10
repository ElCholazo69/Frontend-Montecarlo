import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import { Cancha } from '../../../models/cancha';
import { CanchaService } from '../../../services/cancha.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-lista-canchas',
  imports: [],
  templateUrl: './lista-canchas.html',
  styleUrl: './lista-canchas.scss',
})
export class ListaCanchas implements OnInit{
  canchas:Cancha[] = []
  cargando = true;
  hayCanchasDisponibles = false;
  imagen: string = "https://static.vecteezy.com/system/resources/thumbnails/000/104/368/small/free-soccer-field-vector.jpg";

  constructor(private canchaService:CanchaService, private router: Router, private authService: AuthService){}
  
  ngOnInit(): void {
    this.canchaService.listarCanchas().subscribe({
      next: (data) =>{
        this.canchas=data
        this.hayCanchasDisponibles = data.some(cancha => cancha.estado);
        this.cargando = false;
      },
      error: (err) =>{
        console.error(err)
        this.cargando = false;
      }
    })
  }

  irDetalles(cancha:Cancha){
    if(!this.authService.logueadoSignal()){
      this.router.navigate(['/login'],{
        queryParams:{
          mensaje: 'reserva'
        }
      });
      return;
    }

    const imagen = this.imagen
    this.router.navigate(['/Dcanchas'], {
        state: {
          reserva: {cancha, imagen}
        }
      });
  }
}