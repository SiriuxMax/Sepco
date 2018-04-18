import { TipoPersona2, Perfiles, TipoPersona1 } from "app/Enums/Enumerations";



export class ProfileConfig {



    public static ExtractProfilexTipo2(x: number): number {
        var perfil = 0
        
        switch (x) {
            case TipoPersona2.Testigo:
                perfil = Perfiles.Testigo
                break;
            case TipoPersona2.Abogado:
                perfil = Perfiles.Abogado
                break;
            case TipoPersona2.DelegadosEscrutinio:
                perfil = Perfiles.DelegadosEscrutinio
                break;
            case TipoPersona2.Electorero:
                perfil = Perfiles.Electorero
                break;
            case TipoPersona2.Jurado:
                perfil = Perfiles.Jurado
                break;
            case TipoPersona2.TransportadorCarro:
                perfil = Perfiles.Jurado
                break;
            default:
                perfil = 0
                break;
        }
        return perfil
    }
    public static ExtractProfilexTipo1(x: number): number {
        var perfil = 0
        
        switch (x) {
            case TipoPersona1.CoodinadorElectoral:
                perfil = Perfiles.CoodinadorElectoral
                break;
            case TipoPersona1.ITAuditoria:
                perfil = Perfiles.ITAuditoria
                break;
            case TipoPersona1.TransporteLogistica:
                perfil = Perfiles.TransporteLogistica
                break;
            default:
                perfil = 0
                break;
        }
        return perfil
    }


    public static cuerpo(usuario:string,pass:string) : string{
        var cuerpo:string;
        cuerpo="<!DOCTYPE html>"+
        "<html lang=\"es\">"+
        "<head>"+
        
        "</head>"+
         
        "<body>"+
        "<div>"+
        "    <div style=\"width: 100%;height: 120px;color: white;background-color: #c84c43;\">"+
        "       <div style=\"float:left;width: 119px;\">"+
        "            <img src=\"http://ec2-52-2-44-19.compute-1.amazonaws.com/VisualizaApi/Content/llerascorreo.png\" width=\"100%\">"+
        "       </div>"+
        "        <div style=\"float:right;width: 250px;margin-top:10px;\">"+
        "           <b><h3>Asignacion de Usuario</h3></b>"+
        "        </div>"+
        "    </div>"+
            
        "    <div style=\"color:black;width: 100%;padding-left:27px;padding-top:20px;padding-bottom:50px;background-color:#f0d8d844;font-size:16px;\">"+
                "<p>Cordial saludo.</p>"+
                "<p>Esta es la asignacion de su perfil de usuario en la plataforma.</p>"+
                "<b><p Style=\"margin-left:30px;\">Nombre Usuario: "+usuario+"</p></b>"+
                "<b><p Style=\"margin-left:30px;\">Password: "+pass+"</p></b>"+                
            "</div>"+
        "</div>"+
        "</body>"+
        "</html>";
        return cuerpo;
    }
    constructor(){}
}