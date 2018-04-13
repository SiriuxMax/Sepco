import { TipoPersona2, Perfiles } from "app/Enums/Enumerations";



export class ProfileConfig {



    public static ExtractProfilexTipo2(x: number): number {
        var perfil = 0
        debugger
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
    constructor(){}
}