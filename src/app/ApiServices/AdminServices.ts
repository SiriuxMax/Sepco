
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../app.settings';
import { E_Usuario } from '../Models/E_Usuario';
import { UsuarioBuilder } from '../Builders/Usuario.model.builder';
import { E_Cliente } from '../Models/E_Cliente';
import { HeaderBuilder } from '../Tools/HeaderBuilder';
import { E_Imagen } from '../Models/E_Imagen';
import { E_Reunion } from '../Models/E_Reunion';
import { E_TipoReunion } from '../Models/E_TipoReunion';
import { E_DirectorDepartamento } from '../Models/E_DirectorDepartamento';
import { E_Individuo1 } from '../Models/E_Individuo1';
import { E_Individuo2 } from '../Models/E_Individuo2';
import { E_Sector } from '../Models/E_Sector';
import { E_ZonaElectoral } from '../Models/E_ZonaElectoral';
import { E_PuestoVotacion } from '../Models/E_PuestoVotacion';


@Injectable()
export class AdminServices {
    constructor(private Http: HttpClient, private HeaderBuilder: HeaderBuilder) { }
    private UrlNow: string = AppSettings.Global().API
    private textarea: HTMLTextAreaElement;

    private setOptions() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
            })
        };
        return httpOptions;
    }
    UploadJsonFile(file): Observable<boolean> {
        const httpOptions = {
            headers: new HttpHeaders({
            })
        };
        return this.Http.post(this.UrlNow + "Imagen/UploadJsonFile"
            , file, this.setOptions()).map((x) => { return true })
    }

    RegistrarImagen(obImg: E_Imagen): Observable<number> {
        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(obImg)
        return this.Http.post(this.UrlNow + "Imagen/crearImagen"
            , request, httpOptions).map((x) => { return Number(x) })
    }

    crearTipoReunion(CLient: E_TipoReunion): Observable<boolean> {
        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(CLient)
        return this.Http.post(this.UrlNow + "Admin/crearTipoReunion"
            , request, httpOptions).map(this.EvalBool)
    }

    crearDirectorDepartamento(CLient: E_DirectorDepartamento): Observable<boolean> {
        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(CLient)
        return this.Http.post(this.UrlNow + "Admin/crearDirectorDepartamento"
            , request, httpOptions).map(this.EvalBool)
    }

    crearIndividuo1(CLient: E_Individuo1): Observable<boolean> {
        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(CLient)
        return this.Http.post(this.UrlNow + "Admin/crearIndividuo1"
            , request, httpOptions).map(this.EvalBool)
    }

    crearIndividuo2(CLient: E_Individuo2): Observable<boolean> {
        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(CLient)
        return this.Http.post(this.UrlNow + "Admin/crearIndividuo2"
            , request, httpOptions).map(this.EvalBool)
    }

    crearSector(CLient: E_Sector): Observable<boolean> {
        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(CLient)
        return this.Http.post(this.UrlNow + "Admin/crearSector"
            , request, httpOptions).map(this.EvalBool)
    }

    crearZonaElectoral(CLient: E_ZonaElectoral): Observable<boolean> {
        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(CLient)
        return this.Http.post(this.UrlNow + "Admin/crearZonaElectoral"
            , request, httpOptions).map(this.EvalBool)
    }

    crearPuestoVotacion(CLient: E_PuestoVotacion): Observable<boolean> {
        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(CLient)
        return this.Http.post(this.UrlNow + "Admin/crearPuestoVotacion"
            , request, httpOptions).map(this.EvalBool)
    }

    EvalBool(res: any): boolean {
        var a: boolean = res
        return a
    }

}

