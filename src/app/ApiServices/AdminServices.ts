
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
import { E_Metas } from '../Models/E_Metas';
import { MetasBuilder } from '../Builders/Metas.model.builder';
import { E_Vehiculo } from '../Models/E_Vehiculo';
import { VehiculoBuilder } from '../Builders/Vehiculo.model.builder';
import { E_Like } from '../Models/E_Like';
import { E_MetasDetalle } from '../Models/E_MetasDetalle';
import { E_Impugnacion } from '../Models/E_Impugnacion';
import { E_SitioEscrutino } from '../Models/E_SitioEscrutino';
import { E_ItemsMetas } from '../Models/E_ItemsMetas';

@Injectable()
export class AdminServices {
    constructor(private Http: HttpClient, private HeaderBuilder: HeaderBuilder, private UserService: UserService) { }
    private UrlNow: string = AppSettings.Global().API


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

    listarMetasActivasxDirector(metas: E_Metas): Observable<Array<E_Metas>> {

        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(metas)
        return this.Http.post(this.UrlNow + "Admin/listarMetasxDirexFechasxActiva"
            , request, httpOptions).map(this.ExtractMetas)
    }


    listarMetasxDirector(metas: E_Metas): Observable<Array<E_Metas>> {

        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(metas)
        return this.Http.post(this.UrlNow + "Admin/listarMetasxDir"
            , request, httpOptions).map(this.ExtractMetas)
    }

    listarMetasxGerente(metas: E_Metas): Observable<Array<E_Metas>> {

        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(metas)
        return this.Http.post(this.UrlNow + "Admin/listarMetasxGer"
            , request, httpOptions).map(this.ExtractMetas)
    }

    listarVehiculoxDir(metas: E_Vehiculo): Observable<Array<E_Vehiculo>> {

        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(metas)
        return this.Http.post(this.UrlNow + "Admin/listarVehiculoxDir"
            , request, httpOptions).map(this.ExtractVehiculoss)
    }

    listarVehiculoxIndi(metas: E_Vehiculo): Observable<Array<E_Vehiculo>> {

        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(metas)
        return this.Http.post(this.UrlNow + "Admin/listarVehiculoxIndi"
            , request, httpOptions).map(this.ExtractVehiculoss)
    }

    ExtractVehiculoss(res: any): Array<E_Vehiculo> {

        var x: Array<E_Vehiculo> = new Array<E_Vehiculo>()
        res.forEach(element => {
            x.push(new VehiculoBuilder().buildFromObject(element).Build())
        });
        return x
    }

    ExtractMetas(res: any): Array<E_Metas> {
        
        var x: Array<E_Metas> = new Array<E_Metas>()
        res.forEach(element => {
            x.push(new MetasBuilder().buildFromObject(element).Build())
        });
        return x
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

    enviarEmail(CLient: E_Cliente): Observable<boolean> {
        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(CLient)
        return this.Http.post(this.UrlNow + "Admin/sendCorreo"
            , request, httpOptions).map(this.EvalBool)
    }

    crearDirectorDepartamento(CLient: E_DirectorDepartamento): Observable<boolean> {
        debugger
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

    modificarIndividuo2(CLient: E_Individuo2): Observable<boolean> {
        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(CLient)
        return this.Http.post(this.UrlNow + "Individuo/updateIndividuo2"
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
        
        var x: E_GerenteSector = new E_GerenteSector()
        res.forEach(element => {
            x = new GerenteSectorBuilder().buildFromObject(element).Build();
            return
        });
        return x
    }
    ListarIndividuos2Pendientes(): Observable<Array<E_Individuo2>> {

        const httpOptions = this.HeaderBuilder.HeadNow()
        //var request = JSON.stringify(CLient)
        return this.Http.post(this.UrlNow + "Individuo/ListarIndividuos2Pendientes"
            , "", httpOptions).map(this.ExtractListIndividuo2)
    }

    listarGerentesxsector(obin: E_GerenteSector): Observable<Array<E_GerenteSector>> {

        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(obin)
        return this.Http.post(this.UrlNow + "Individuo/ListarGerentesSectorxSector"
            , request, httpOptions).map(this.ExtractGerenteSector)
    }

    Individuo2xCorreo(obin: E_Individuo2): Observable<E_Individuo2> {
        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(obin)
        return this.Http.post(this.UrlNow + "Individuo/Individuo2xCorreo"
            , request, httpOptions).map(this.ExtractIndividuo2)
    }

    directorxCorreo(obin: E_DirectorDepartamento): Observable<E_DirectorDepartamento> {
        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(obin)
        return this.Http.post(this.UrlNow + "Admin/DirectorxCorreo"
            , request, httpOptions).map(this.ExtractDirector)
    }

    gerentexCorreo(obin: E_GerenteSector): Observable<E_GerenteSector> {
        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(obin)
        return this.Http.post(this.UrlNow + "Individuo/GerentexCorreo"
            , request, httpOptions).map(this.ExtractGerente2)
    }

    ExtractGerente2(res: any): E_GerenteSector {
        
        var x: E_GerenteSector = new E_GerenteSector()
        if (res != null) { x = new GerenteSectorBuilder().buildFromObject(res).Build() }
        return x
    }

    ExtractDirector(res: any): E_DirectorDepartamento {
        
        var x: E_DirectorDepartamento = new E_DirectorDepartamento()
        if (res != null) { x = new DirectorDepartamentoBuilder().buildFromObject(res).Build() }
        return x
    }

    ExtractIndividuo2(res: any): E_Individuo2 {
        
        var x: E_Individuo2 = new E_Individuo2()
        if (res != null) { x = new Individuo2Builder().buildFromObject(res).Build() }
        return x
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

    vehiculoFiltro(CLient: E_Vehiculo): Observable<Array<E_Vehiculo>> {
        ;
        var IdUser = this.UserService.GetCurrentCurrentUserNow().Id
        const httpOptions = this.HeaderBuilder.HeadNow(IdUser)
        var request = JSON.stringify(CLient)
        return this.Http.post(this.UrlNow + "Admin/vehiculoFiltrar"
            , request, httpOptions).map(this.ExtractVehiculoss)
    }


    crearLike(CLient: E_Like): Observable<boolean> {
        var User: E_Usuario = this.UserService.GetCurrentCurrentUserNow()
        const httpOptions = this.HeaderBuilder.HeadNow(User.Id)
        var request = JSON.stringify(CLient)
        return this.Http.post(this.UrlNow + "Likes/crearLikes"
            , request, httpOptions).map(this.EvalBool)
    }

    EvalBool(res: any): boolean {
        var a: boolean = res
        return a
    }


    crearVehiculo(CLient: E_Vehiculo): Observable<boolean> {
        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(CLient)
        return this.Http.post(this.UrlNow + "Admin/crearVehiculo"
            , request, httpOptions).map(this.EvalBool)
    }

    crearSitioEscrutino(CLient: E_SitioEscrutino): Observable<boolean> {
        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(CLient)
        return this.Http.post(this.UrlNow + "Admin/crearSitioEscrutino"
            , request, httpOptions).map(this.EvalBool)
    }

    crearItemsMetas(CLient: E_ItemsMetas): Observable<boolean> {

        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(CLient)
        return this.Http.post(this.UrlNow + "Admin/crearItemsMetas"
            , request, httpOptions).map(this.EvalBool)
    }

    crearMetas(CLient: E_Metas): Observable<boolean> {
        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(CLient)
        return this.Http.post(this.UrlNow + "Admin/crearMetas"
            , request, httpOptions).map(this.EvalBool)
    }

    crearMetasDetalle(CLient: E_MetasDetalle): Observable<boolean> {
        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(CLient)
        return this.Http.post(this.UrlNow + "Admin/crearMetasDetalle"
            , request, httpOptions).map(this.EvalBool)
    }

    crearImpugnacion(CLient: E_Impugnacion): Observable<boolean> {
        var User: E_Usuario = this.UserService.GetCurrentCurrentUserNow()
        const httpOptions = this.HeaderBuilder.HeadNow(User.Id)
        var request = JSON.stringify(CLient)
        return this.Http.post(this.UrlNow + "Admin/crearImpugnacion"
            , request, httpOptions).map(this.EvalBool)
    }
}

