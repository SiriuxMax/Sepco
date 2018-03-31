import { E_Error } from "../Models/E_Error";
import { E_Usuario } from "../Models/E_Usuario";
import { E_Imagen } from "../Models/E_Imagen";

export class ImagenBuilder {
    public Id: number
    public Nombre: string
    public Ruta: string
    public FechaCreacion: Date
    public id_reunion: number
    public aprobada: boolean
    constructor() { }
    buildFromObject(x: any): ImagenBuilder {
        if (x.Id != undefined) { this.Id = x.Id }
        if (x.Nombre != undefined) { this.Nombre = x.Nombre }
        if (x.Ruta != undefined) { this.Ruta = x.Ruta }
        if (x.FechaCreacion != undefined) { this.FechaCreacion = x.FechaCreacion }
        if (x.id_reunion != undefined) { this.id_reunion = x.id_reunion }
        if (x.aprobada != undefined) { this.aprobada = x.aprobada }
        return this
    }
    Build(): E_Imagen {
        var obj: E_Imagen = new E_Imagen()
        obj.Id = this.Id
        obj.Nombre = this.Nombre
        obj.aprobada = this.aprobada
        obj.FechaCreacion = this.FechaCreacion
        obj.id_reunion = this.id_reunion
        obj.Ruta = this.Ruta
        obj.FechaCreacion = this.FechaCreacion
        return obj
    }


}
