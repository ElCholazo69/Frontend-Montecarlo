export interface Usuario{
    id_usuario?:number
    apellido:string
    correo:string
    nombre:string
    password:string
    rol:'ADMIN'|'CLIENTE'
    telefono:string
}