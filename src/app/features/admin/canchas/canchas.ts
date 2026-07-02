import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CanchaService } from '../../../services/cancha.service';
import { Cancha } from '../../../models/cancha';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-canchas',
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './canchas.html',
  styleUrl: './canchas.scss',
})
export class Canchas implements OnInit{
  mostrarTabla: boolean = false;
  esEdicion: boolean = false;
  cancha:Cancha[] = [];
  formularioCancha: FormGroup;
  canchaEditando?: Cancha

  constructor(private canchaService:CanchaService, private fb: FormBuilder){
    this.formularioCancha = this.fb.group({
      nombreCancha: ['', Validators.required],
      precioHora: ['', Validators.required],
      estado: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.actualizarListaCanchas()
  }
  
  onSubmit() {
    if (this.formularioCancha.valid) {
      const {nombreCancha, precioHora, estado, descripcion} = this.formularioCancha.value;
      const nuevacancha:Cancha ={
        descripcion: descripcion,
        estado: estado,
        nombre: nombreCancha,
        precioHora: precioHora
      }

      if(this.esEdicion){
        this.editarCancha(this.canchaEditando?.id, nuevacancha)
      }else{
        this.crearCancha(nuevacancha)
      }
    } else {
      this.formularioCancha.markAllAsTouched();
    }
  }

  abrirTablaCrear(){
    this.esEdicion = false;
    this.mostrarTabla = true;
  }

  mostrarTablaEditar(cancha:Cancha){
    this.esEdicion = true;
    this.mostrarTabla = true;
    this.formularioCancha.reset({
        nombreCancha: cancha.nombre,
        precioHora: cancha.precioHora,
        estado: cancha.estado,
        descripcion: cancha.descripcion
    })
    this.canchaEditando = cancha
  }

  cerrarTabla(){
    this.mostrarTabla = false;
    this.formularioCancha.reset({
        nombreCancha: '',
        precioHora: '',
        estado: '',
        descripcion: ''
    })
  }
  
  obtenerClaseEstado(estado: Boolean){
    if (estado === true) {
      return 'disponible'
    } else{
      return 'noDisponible'
    }
  }
  
  obtenerTextoEstado(estado: Boolean){
    if (estado === true) {
      return 'Disponible'
    } else{
      return 'No Disponible'
    }
  }

  actualizarListaCanchas(){
    this.canchaService.listarCanchas().subscribe({
      next: (data) =>{
        this.cancha = data
      },
      error: (err) =>{
        console.error(err)
      }
    })
  }

  crearCancha(nuevaCancha:Cancha){
    this.canchaService.crearCancha(nuevaCancha).subscribe({
      complete: () =>{
        alert("Cancha creada correctamente")
        this.actualizarListaCanchas()
        this.cerrarTabla()
      },
      error: (err) =>{
        alert("Error al crear la cancha")
        console.error(err)
      }
    })
  }

  editarCancha(id:any, canchaActualizada:Cancha){
    this.canchaService.editarCancha(id,canchaActualizada).subscribe({
      complete: () =>{
        alert("Se actualizo la cancha")
        this.actualizarListaCanchas()
        this.cerrarTabla()
      },
      error: (err) =>{
        alert("Error al actualizar la cancha")
        console.error(err)
      }
    })
  }

  eliminarCancha(id:any){
    const comfirmacion = confirm("¿Esta seguro que desea eliminar la cancha seleccionada?")
    if(comfirmacion){
      this.canchaService.eliminarCancha(id).subscribe({
        complete: () =>{
          alert("Cancha eliminada correctamente")
          this.actualizarListaCanchas()
        },
        error: (err) =>{
          alert("Error al eliminar la cancha")
          console.error(err)
        }
      });
    }
  }
}