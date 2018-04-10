
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../app.settings';
import { E_Usuario } from '../Models/E_Usuario';
import { UsuarioBuilder } from '../Builders/Usuario.model.builder';
import { E_Departamentos } from '../Models/E_Departamentos';
import { DepartamentosBuilder } from '../Builders/Departamentos.model.builder';
import { E_Municipios } from '../Models/E_Municipios';
import { MunicipiosBuilder } from '../Builders/Municipios.model.builder';
import { E_TipoReunion } from '../Models/E_TipoReunion';

import { E_Sector } from '../Models/E_Sector';
import { SectorBuilder } from '../Builders/Sector.model.builder';
import { E_TipoIndividuo1 } from '../Models/E_TipoIndividuo1';
import { TipoIndividuo1Builder } from '../Builders/TipoIndividuo1.model.builder';
import { E_TipoIndividuo2 } from '../Models/E_TipoIndividuo2';
import { TipoIndividuo2Builder } from '../Builders/TipoIndividuo2.model.builder';
import { E_ZonaElectoral } from '../Models/E_ZonaElectoral';
import { ZonaElectoralBuilder } from '../Builders/ZonaElectoral.model.builder';
import { E_PuestoVotacion } from '../Models/E_PuestoVotacion';
import { PuestoVotacionBuilder } from '../Builders/PuestoVotacion.model.builder';

@Injectable()
export class ParameterService {
    constructor(private Http: HttpClient) { }
    private UrlNow: string = AppSettings.Global().API
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

    listarTipoIndividuo1(): Observable<Array<E_TipoIndividuo1>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify("")
        return this.Http.post(this.UrlNow + "Individuo/listarTipoIndividuo1"
            , request, httpOptions).map(this.ExtractTipoIndividuo1)
    }
    listarTipoIndividuo2(): Observable<Array<E_TipoIndividuo2>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify("")
        return this.Http.post(this.UrlNow + "Individuo/ListarTipoIndividuo2"
            , request, httpOptions).map(this.ExtractTipoIndividuo2)
    }


    ListarSector(objSector: E_Sector): Observable<Array<E_Sector>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify(objSector)
        return this.Http.post(this.UrlNow + "Admin/listarSector"
            , request, httpOptions).map(this.ExtractSector)
    }

    ListarZonaElectoral(): Observable<Array<E_ZonaElectoral>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify("")
        return this.Http.post(this.UrlNow + "Admin/ListarZonaElectoral"
            , request, httpOptions).map(this.ExtractZonaElectoral)
    }

    listarZonasxMunicipio(obj :E_ZonaElectoral): Observable<Array<E_ZonaElectoral>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify(obj)
        return this.Http.post(this.UrlNow + "Admin/listarZonasxMunicipio"
            , request, httpOptions).map(this.ExtractZonaElectoral)
    }
    listarPuestosVotacionxZona(obj :E_PuestoVotacion): Observable<Array<E_PuestoVotacion>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify(obj)
        return this.Http.post(this.UrlNow + "Admin/listarPuestosVotacionxZona"
            , request, httpOptions).map(this.ExtractPuestoVotacion)
    }
    
    

    ListarPuestoVotacion(): Observable<Array<E_PuestoVotacion>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify("")
        return this.Http.post(this.UrlNow + "Admin/ListarPuestoVotacion"
            , request, httpOptions).map(this.ExtractPuestoVotacion)
    }

    ListarTipoReunion(E_TipoReunion: E_TipoReunion): Observable<Array<E_TipoReunion>> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify(E_TipoReunion)
        return this.Http.post(this.UrlNow + "Admin/ListarTipoReunion"
            , request, httpOptions).map(this.ExtractTipoReunion)
    }



    ExtractTipoReunion(res: any): Array<E_TipoReunion> {

        var x: Array<E_TipoReunion> = new Array<E_TipoReunion>()
        if (res != null) {

            res.forEach((element) => {
                var y: E_TipoReunion = new E_TipoReunion()
                y = element
                x.push(y)
            });

        }
        return x
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
    ExtractSector(res: any): Array<E_Sector> {

        var x: Array<E_Sector> = new Array<E_Sector>()
        if (res != null) {
            res.forEach((element) => {
                x.push(new SectorBuilder().buildFromObject(element).Build())
            });

        }
        return x
    }
    ExtractTipoIndividuo1(res: any): Array<E_TipoIndividuo1> {

        var x: Array<E_TipoIndividuo1> = new Array<E_TipoIndividuo1>()
        if (res != null) {
            res.forEach((element) => {
                x.push(new TipoIndividuo1Builder().buildFromObject(element).Build())
            });

        }
        return x
    }
    ExtractTipoIndividuo2(res: any): Array<E_TipoIndividuo2> {

        var x: Array<E_TipoIndividuo2> = new Array<E_TipoIndividuo2>()
        if (res != null) {
            res.forEach((element) => {
                x.push(new TipoIndividuo2Builder().buildFromObject(element).Build())
            });

        }
        return x
    }
    ExtractZonaElectoral(res: any): Array<E_ZonaElectoral> {

        var x: Array<E_ZonaElectoral> = new Array<E_ZonaElectoral>()
        if (res != null) {
            res.forEach((element) => {
                x.push(new ZonaElectoralBuilder().buildFromObject(element).Build())
            });

        }
        return x
    }
    ExtractPuestoVotacion(res: any): Array<E_PuestoVotacion> {

        var x: Array<E_PuestoVotacion> = new Array<E_PuestoVotacion>()
        if (res != null) {
            res.forEach((element) => {
                x.push(new PuestoVotacionBuilder().buildFromObject(element).Build())
            });

        }
        return x
    }

}


