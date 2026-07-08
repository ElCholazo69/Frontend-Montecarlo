export interface Consulta{
    id?: number
    asunto: string
    mensaje: string
    fecha: Date
    usuarioId: number
    respuesta: string | null
    fechaRespuesta: Date | null
    estado: string;
}