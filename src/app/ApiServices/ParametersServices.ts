
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../appSettings';
import { E_Usuario } from '../Models/E_Usuario';
import { UsuarioBuilder } from '../Builders/Usuario.model.builder';
import { E_Departamentos } from '../Models/E_Departamentos';
import { DepartamentosBuilder } from '../Builders/Departamentos.model.builder';
import { E_Municipios } from '../Models/E_Municipios';
import { MunicipiosBuilder } from '../Builders/Municipios.model.builder';

@Injectable()
export class ParameterService {
    constructor(private Http: HttpClient) { }
    private UrlNow: string = AppSettings.API_URL
    private textarea: HTMLTextAreaElement;

    /** Copy the text value to the clipboard. */
    listarDepartamentos(): Observable<Array<E_Departamentos>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify("")
        return this.Http.post(this.UrlNow + "Admin/listarDepartamentos"
            , request, httpOptions).map(this.ExtractDeparatamentos)
    }

    ListarMunicipios(): Observable<Array<E_Municipios>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify("")
        return this.Http.post(this.UrlNow + "Admin/ListarMunicipios"
            , request, httpOptions).map(this.ExtractMunicipios)
    }


    ExtractMunicipios(res: any): Array<E_Municipios> {
        
        var x: Array<E_Municipios> = new Array<E_Municipios>()
        if (res != null) {
            res.forEach((element) => {
                x.push(new MunicipiosBuilder().buildFromObject(element).Build())
            });

        }
        return x
    }
    ExtractDeparatamentos(res: any): Array<E_Departamentos> {
        
        var x: Array<E_Departamentos> = new Array<E_Departamentos>()
        if (res != null) {
            res.forEach((element) => {
                x.push(new DepartamentosBuilder().buildFromObject(element).Build())
            });

        }
        return x
    }

}


