import { E_Error } from "../Models/E_Error";
import { E_Usuario } from "../Models/E_Usuario";
import { E_Reunion } from "../Models/E_Reunion";
import { UsuarioBuilder } from "./Usuario.model.builder";

export class ReunionBuilder {
    public Id: number
    public Descripcion: string
    public Titulo: string
    public Id_Departamento: number
    public Id_Municipio: number
    public Id_TipoReunion: number
    public CantidadPersonas: number
    public Estado: boolean
    public FechaCreacion: Date
    public total: number
    public NombreDepartamento: string
    constructor() { }
    buildFromObject(x: any): ReunionBuilder {
        if (x.Id != undefined) { this.Id = x.Id }
        if (x.Descripcion != undefined) { this.Descripcion = x.Descripcion }
        if (x.Id_Departamento != undefined) { this.Id_Departamento = x.Id_Departamento }
        if (x.Id_Municipio != undefined) { this.Id_Municipio = x.Id_Municipio }
        if (x.Id_TipoReunion != undefined) { this.Id_TipoReunion = x.Id_TipoReunion }
        if (x.CantidadPersonas != undefined) { this.CantidadPersonas = x.CantidadPersonas }
        if (x.Estado != undefined) { this.Estado = x.Estado }
        if (x.FechaCreacion != undefined) { this.FechaCreacion = x.FechaCreacion }
        if (x.total != undefined) { this.total = x.total }
        if (x.NombreDepartamento != undefined) { this.NombreDepartamento = x.NombreDepartamento }
        return this
    }
    Build(): E_Reunion {
        var obj: E_Reunion = new E_Reunion()
        obj.Id = this.Id
        obj.Descripcion = this.Descripcion
        obj.Id_Departamento = this.Id_Departamento
        obj.Id_Municipio = this.Id_Municipio
        obj.Id_TipoReunion = this.Id_TipoReunion
        obj.CantidadPersonas = this.CantidadPersonas
        obj.Estado = this.Estado
        obj.FechaCreacion = this.FechaCreacion
        obj.total = this.total
        obj.NombreDepartamento = this.NombreDepartamento
        return obj
    }


}
