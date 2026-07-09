import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PagoService } from '../../../services/pago.service';
import { Pago } from '../../../models/pago';

@Component({
  selector: 'app-mis-pagos',
  imports: [DatePipe],
  templateUrl: './mis-pagos.html',
  styleUrl: './mis-pagos.scss',
})
export class MisPagos {
  pagos: Pago[] = [];

  constructor(private pagoService: PagoService) {}

  ngOnInit(): void {
    this.listarPagos();
  }

  listarPagos(): void {
    this.pagoService.listarMisPagos().subscribe({
      next: (data) => {
        this.pagos = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  descargarComprobante(id: number, codigoOperacion: string): void {
      this.pagoService.descargarComprobante(id).subscribe({

      next: (pdf: Blob) => {

        const url = window.URL.createObjectURL(pdf);

        const enlace = document.createElement('a');

        enlace.href = url;
        enlace.download = `comprobante-${codigoOperacion}.pdf`;

        enlace.click();

        window.URL.revokeObjectURL(url);

      },

      error: (err) => {
        console.error(err);
        alert('No se pudo descargar el comprobante.');
      }

    });
  }
}
