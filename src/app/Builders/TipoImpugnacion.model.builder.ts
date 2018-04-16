import { E_Error } from "../Models/E_Error";
import { E_Usuario } from "../Models/E_Usuario";
import { E_TipoImpugnacion } from "../Models/E_TipoImpugnacion";

export class TipoImpugnacionBuilder {    
    public Id: number
    public Nombre: string
    public Activo: boolean 
    
    buildFromObject(x: any): TipoImpugnacionBuilder {
        if (x.Id != undefined) { this.Id = x.Id }
        if (x.Nombre != undefined) { this.Nombre = x.Nombre }       
        if (x.Activo != undefined) { this.Activo = x.Activo }     
        
        return this
    }
    Build(): E_TipoImpugnacion {
        var obj: E_TipoImpugnacion = new E_TipoImpugnacion()
        obj.Id = this.Id
        obj.Nombre = this.Nombre      
        obj.Activo = this.Activo       

        return obj
    }

}
