import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagoRegistro } from '../models/pago-registro';
import { Observable } from 'rxjs';
import { Pago } from '../models/pago';

@Injectable({
  providedIn: 'root',
})
export class PagoService {
  private backendURL = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  procesarPago(pago: PagoRegistro): Observable<Pago> {
    return this.http.post<Pago>(`${this.backendURL}/pagos`, pago);
  }
  
  listarMisPagos(): Observable<Pago[]>{
    return this.http.get<Pago[]>(`${this.backendURL}/pagos/mis-pagos`);
  }

  descargarComprobante(id: number): Observable<Blob>{
    return this.http.get(`${this.backendURL}/pdf/${id}`,
      {
        responseType: 'blob'
      }
    );
  } 
}
