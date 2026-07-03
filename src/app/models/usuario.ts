export interface Usuario{
    id?:number
    apellido:string
    correo:string
    nombre:string
    password:string
    rol:'ADMIN'|'CLIENTE'
    telefono:string
}