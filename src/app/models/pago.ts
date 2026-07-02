export interface Pago{
    id?: number;
    monto: number;
    fecha_pago: string;
    codigo_operacion: string;
    estado: string;
    reserva_id: number;
}