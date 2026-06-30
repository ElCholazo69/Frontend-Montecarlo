import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import { Cancha } from '../../../models/cancha';
import { CanchaService } from '../../../services/cancha.service';

@Component({
  selector: 'app-lista-canchas',
  imports: [],
  templateUrl: './lista-canchas.html',
  styleUrl: './lista-canchas.scss',
})
export class ListaCanchas implements OnInit{
  canchas:Cancha[] = []
  imagen: string = "https://static.vecteezy.com/system/resources/thumbnails/000/104/368/small/free-soccer-field-vector.jpg";

  constructor(private canchaService:CanchaService, private router: Router){}
  
  ngOnInit(): void {
    this.canchaService.listarCanchas().subscribe({
      next: (data) =>{
        this.canchas=data
      },
      error: (err) =>{
        console.error(err)
      }
    })
  }

  irDetalles(cancha:Cancha){
    const imagen = this.imagen
    this.router.navigate(['/Dcanchas'], {
        state: {
          reserva: {cancha, imagen}
        }
      });
  }
}