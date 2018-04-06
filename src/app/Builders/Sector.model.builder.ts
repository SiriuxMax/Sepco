import { E_Error } from "../Models/E_Error";
import { E_Usuario } from "../Models/E_Usuario";
import { E_Departamentos } from "../Models/E_Departamentos";
import { E_Sector } from "../Models/E_Sector";

export class SectorBuilder {
    public Id: number
    public Activo: boolean
    public FechaCreacion: Date
    public Id_Departamento: number
    public Nombre: string
    buildFromObject(x: any): SectorBuilder {
        if (x.Id != undefined) { this.Id = x.Id }
        if (x.Id_Departamento != undefined) { this.Id_Departamento = x.Id_Departamento }
        if (x.FechaCreacion != undefined) { this.FechaCreacion = x.FechaCreacion }
        if (x.Activo != undefined) { this.Activo = x.Activo }
        if (x.Nombre != undefined) { this.Nombre = x.Nombre }

        return this
    }
    Build(): E_Sector {
        var obj: E_Sector = new E_Sector()
        obj.Id = this.Id
        obj.Id_Departamento = this.Id_Departamento
        obj.FechaCreacion = this.FechaCreacion
        obj.Activo = this.Activo
        obj.Nombre = this.Nombre
        return obj
    }


}
