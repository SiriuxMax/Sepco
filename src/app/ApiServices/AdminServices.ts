
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
import { UserService } from 'app/ApiServices/UserService';
import { DirectorDepartamentoBuilder } from 'app/Builders/DirectorDepartamento.model.builder';
import { E_Mesa } from '../Models/E_Mesa';
import { E_GerenteSector } from '../Models/E_GerenteSector';
import { Individuo2Builder } from '../Builders/Individuo2.model.builder';
import { GerenteSectorBuilder } from '../Builders/GerenteSector.model.builder';


@Injectable()
export class AdminServices {
    constructor(private Http: HttpClient, private HeaderBuilder: HeaderBuilder, private UserService: UserService) { }
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
        var User: E_Usuario = this.UserService.GetCurrentCurrentUserNow()
        const httpOptions = this.HeaderBuilder.HeadNow(User.Id)
        var request = JSON.stringify(CLient)
        return this.Http.post(this.UrlNow + "Admin/crearDirectorDepto"
            , request, httpOptions).map(this.EvalBool)
    }

    crearIndividuo1(CLient: E_Individuo1): Observable<boolean> {
        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(CLient)
        return this.Http.post(this.UrlNow + "Individuo/crearIndividuo1"
            , request, httpOptions).map(this.EvalBool)
    }


    ListarDirectorDepto(CLient: E_DirectorDepartamento): Observable<Array<E_DirectorDepartamento>> {
        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(CLient)
        return this.Http.post(this.UrlNow + "Admin/ListarDirectorDepto"
            , request, httpOptions).map(this.ExtractListDirector)
    }

    ListarGerentesSectorxCorreo(CLient: E_GerenteSector): Observable<E_GerenteSector> {
        var User: E_Usuario = this.UserService.GetCurrentCurrentUserNow()
        const httpOptions = this.HeaderBuilder.HeadNow(User.Id)
        var request = JSON.stringify(CLient)
        return this.Http.post(this.UrlNow + "Individuo/ListarGerentesSectorxCorreo"
            , request, httpOptions).map(this.ExtractGerente)
    }
        ListarDirectorDeptoxGerente(CLient: E_DirectorDepartamento): Observable<Array<E_DirectorDepartamento>> {
        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(CLient)
        return this.Http.post(this.UrlNow + "Admin/ListarDirectorDeptoxGerente"
            , request, httpOptions).map(this.ExtractListDirector)
    }
    ExtractGerente(res: any): E_GerenteSector {
        debugger
        var x: E_GerenteSector = new E_GerenteSector()
        res.forEach(element => {
            x = new GerenteSectorBuilder().buildFromObject(element).Build();
            return
        });
        return x
    }
       ListarIndividuos2Pendientes(): Observable<Array<E_Individuo2>> {
        debugger;
        const httpOptions = this.HeaderBuilder.HeadNow()
        //var request = JSON.stringify(CLient)
        return this.Http.post(this.UrlNow + "Individuo/ListarIndividuos2Pendientes"
            , "", httpOptions).map(this.ExtractListIndividuo2)
    }

 listarGerentesxsector(obin:E_GerenteSector): Observable<Array<E_GerenteSector>> {
        debugger;
        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(obin)
        return this.Http.post(this.UrlNow + "Individuo/ListarGerentesSectorxSector"
            , request, httpOptions).map(this.ExtractGerenteSector)
    }

    ExtractGerenteSector(res: any): Array<E_GerenteSector> {

        var x: Array<E_GerenteSector> = new Array<E_GerenteSector>()
        res.forEach(element => {
            x.push(new GerenteSectorBuilder().buildFromObject(element).Build())
        });
        return x
    }

    ExtractListDirector(res: any): Array<E_DirectorDepartamento> {

        var x: Array<E_DirectorDepartamento> = new Array<E_DirectorDepartamento>()
        res.forEach(element => {
            x.push(new DirectorDepartamentoBuilder().buildFromObject(element).Build())
        });
        return x
    }

    ExtractListIndividuo2(res: any): Array<E_Individuo2> {

        var x: Array<E_Individuo2> = new Array<E_Individuo2>()
        res.forEach(element => {
            x.push(new Individuo2Builder().buildFromObject(element).Build())
        });
        return x
    }

    crearGerenteSector(CLient: E_GerenteSector): Observable<boolean> {
        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(CLient)
        return this.Http.post(this.UrlNow + "Individuo/crearGerenteSector"
            , request, httpOptions).map(this.EvalBool)
    }


    crearIndividuo2(CLient: E_Individuo2): Observable<boolean> {
        var User: E_Usuario = this.UserService.GetCurrentCurrentUserNow()
        const httpOptions = this.HeaderBuilder.HeadNow(User.Id)
        var request = JSON.stringify(CLient)
        return this.Http.post(this.UrlNow + "Admin/crearIndividuo2"
            , request, httpOptions).map(this.EvalBool)
    }

    crearSector(CLient: E_Sector): Observable<boolean> {
        var User: E_Usuario = this.UserService.GetCurrentCurrentUserNow()
        const httpOptions = this.HeaderBuilder.HeadNow(User.Id)
        var request = JSON.stringify(CLient)
        return this.Http.post(this.UrlNow + "Admin/crearSector"
            , request, httpOptions).map(this.EvalBool)
    }

    crearZonaElectoral(CLient: E_ZonaElectoral): Observable<boolean> {
        var User: E_Usuario = this.UserService.GetCurrentCurrentUserNow()
        const httpOptions = this.HeaderBuilder.HeadNow(User.Id)
        var request = JSON.stringify(CLient)
        return this.Http.post(this.UrlNow + "Admin/crearZonaElectoral"
            , request, httpOptions).map(this.EvalBool)
    }

    crearPuestoVotacion(CLient: E_PuestoVotacion): Observable<boolean> {
        var User: E_Usuario = this.UserService.GetCurrentCurrentUserNow()
        const httpOptions = this.HeaderBuilder.HeadNow(User.Id)
        var request = JSON.stringify(CLient)
        return this.Http.post(this.UrlNow + "Admin/crearPuestoVotacion"
            , request, httpOptions).map(this.EvalBool)
    }

    crearMesa(CLient: E_Mesa): Observable<boolean> {
        var User: E_Usuario = this.UserService.GetCurrentCurrentUserNow()
        const httpOptions = this.HeaderBuilder.HeadNow(User.Id)
        var request = JSON.stringify(CLient)
        return this.Http.post(this.UrlNow + "Admin/crearMesas"
            , request, httpOptions).map(this.EvalBool)
    }
    EvalBool(res: any): boolean {
        var a: boolean = res
        return a
    }

}

