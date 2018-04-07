import { E_Error } from "../Models/E_Error";
import { E_Usuario } from "../Models/E_Usuario";
import { E_DirectorDepartamento } from "../Models/E_DirectorDepartamento";
import { UsuarioBuilder } from "./Usuario.model.builder";

export class DirectorDepartamentoBuilder {
    public Id: number
    public Cedula: string
    public Nombres: string
    public Apellidos: string
    public Direccion: string
    public Correo: string
    public Telefono: string
    public Celular: string   
    public Id_Departamento: number
    public Estado: boolean
    public FechaCreacion: Date
    public Id_Sector: number
    public CambiarClave: boolean
    public CreadoPor: number    
    constructor() { }
    buildFromObject(x: any): DirectorDepartamentoBuilder {
        if (x.Id != undefined) { this.Id = x.Id }
        if (x.Cedula != undefined) { this.Cedula = x.Cedula }
        if (x.Nombres != undefined) { this.Nombres = x.Nombres }
        if (x.Apellidos != undefined) { this.Apellidos = x.Apellidos }
        if (x.Telefono != undefined) { this.Telefono = x.Telefono }
        if (x.Celular != undefined) { this.Celular = x.Celular }
        if (x.Correo != undefined) { this.Correo = x.Correo }
        if (x.Direccion != undefined) { this.Direccion = x.Direccion }
        if (x.Id_Departamento != undefined) { this.Id_Departamento = x.Id_Departamento }
        if (x.Id_Sector != undefined) { this.Id_Sector = x.Id_Sector }
        if (x.Estado != undefined) { this.Estado = x.Estado }
        if (x.FechaCreacion != undefined) { this.FechaCreacion = x.FechaCreacion }
        if (x.CambiarClave != undefined) { this.CambiarClave = x.CambiarClave }
        if (x.CreadoPor != undefined) { this.CreadoPor = x.CreadoPor }

       
        return this
    }
    Build(): E_DirectorDepartamento {
        var obj: E_DirectorDepartamento = new E_DirectorDepartamento()
        obj.Id = this.Id
        obj.Cedula = this.Cedula
        obj.Nombres = this.Nombres
        obj.Apellidos = this.Apellidos
        obj.Telefono = this.Telefono
        obj.Celular = this.Celular
        obj.Correo = this.Correo
        obj.Direccion = this.Direccion
        obj.Id_Departamento = this.Id_Departamento
        obj.Id_Sector = this.Id_Sector
        obj.Estado = this.Estado
        obj.FechaCreacion = this.FechaCreacion
        obj.CambiarClave = this.CambiarClave
        obj.CreadoPor = this.CreadoPor
        return obj
    }


}
