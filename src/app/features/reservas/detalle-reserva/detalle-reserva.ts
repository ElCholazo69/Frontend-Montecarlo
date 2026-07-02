import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Reserva } from '../../../models/reserva';
import { Cancha } from '../../../models/cancha';

@Component({
  selector: 'app-detalle-reserva',
  imports: [],
  templateUrl: './detalle-reserva.html',
  styleUrl: './detalle-reserva.scss',
})
export class DetalleReserva {
  @Input() visible = false;

  @Input() reserva?: Reserva;

  @Input() cancha?: Cancha;

  @Input() numeroReserva = 0;

  @Output() cerrarModal = new EventEmitter<void>();

  cerrar(): void {
    this.cerrarModal.emit();
  }

  formatearHora(hora: string): string {

    if (!hora) return '';

    const [h, m] = hora.split(':').map(Number);

    const periodo = h >= 12 ? 'PM' : 'AM';

    const hora12 = h % 12 || 12;

    return `${hora12}:${m.toString().padStart(2, '0')} ${periodo}`;

  }

}
