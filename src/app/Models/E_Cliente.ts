import { E_Usuario } from "./E_Usuario";
import { E_Error } from "./E_Error";

export class E_Cliente {
    public Id: number
    public Cedula: string
    public Nombre: string
    public Apellido: string
    public Telefono: string
    public Celular: string
    public Correo: string
    public Direccion: string
    public Id_Departamento: number
    public Id_Municipio: number
    public Estado: boolean
    public FechaCreacion: Date
    public usuario: E_Usuario
    public error :E_Error
    constructor() { }
}