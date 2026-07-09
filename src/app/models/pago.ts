export interface Pago{
    id?: number
    monto: number
    fechaPago: string
    codigoOperacion: string
    estado: string
    reservaId: number
}