
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../appSettings';
import { E_Usuario } from '../Models/E_Usuario';
import { UsuarioBuilder } from '../Builders/Usuario.model.builder';
import { E_Cliente } from '../Models/E_Cliente';
import { HeaderBuilder } from '../Tools/HeaderBuilder';
import { E_Imagen } from '../Models/E_Imagen';
import { E_Reunion } from '../Models/E_Reunion';
import { ReunionBuilder } from '../Builders/Reunion.model.builder';
import { UserService } from './UserService';
import { E_Comentarios } from '../Models/E_Comentarios';
import { ComentariosBuilder } from '../Builders/Comentarios.model.builder';


@Injectable()
export class ReunionService {
    constructor(private Http: HttpClient, private HeaderBuilder: HeaderBuilder, private UserService: UserService) { }
    private UrlNow: string = AppSettings.API_URL
    private textarea: HTMLTextAreaElement;

    private setOptions() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
            })
        };
        return httpOptions;
    }
    ReunionesxDepto(Obj: E_Reunion): Observable<Array<E_Reunion>> {
        var IdUser = this.UserService.GetCurrentCurrentUserNow().Id
        Obj.Id_Usuario = IdUser
        const httpOptions = this.HeaderBuilder.HeadNow(IdUser)
        let request = JSON.stringify(Obj)
        return this.Http.post(this.UrlNow + "Reunion/ReunionesxDepto"
            , request, httpOptions).map(this.ExtractReunion)
    }
    ExtractReunion(res: any): Array<E_Reunion> {

        var x: Array<E_Reunion> = new Array<E_Reunion>()
        if (res != null) {
            res.forEach((element) => {
                x.push(new ReunionBuilder().buildFromObject(element).Build())
            });

        }
        return x
    }

    RegistrarImagen(obImg: E_Imagen): Observable<number> {
        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(obImg)
        return this.Http.post(this.UrlNow + "Imagen/crearImagen"
            , request, httpOptions).map((x) => { return Number(x) })
    }

    crearReunion(obImg: E_Reunion): Observable<number> {
        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(obImg)
        return this.Http.post(this.UrlNow + "Reunion/crearReunion"
            , request, httpOptions).map((x) => { return Number(x) })
    }



    crearComentario(obImg: E_Comentarios): Observable<number> {
        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(obImg)
        return this.Http.post(this.UrlNow + "Comentario/crearComentario"
            , request, httpOptions).map((x) => { return Number(x) })
    }

    ComentariosXImagen(obImg: E_Comentarios): Observable<Array<E_Comentarios>> {
        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(obImg)
        return this.Http.post(this.UrlNow + "Comentario/ComentariosXImagen"
            , request, httpOptions).map(this.extracComentarios)
    }

    extracComentarios(x) {
        var y: Array<E_Comentarios> = new Array<E_Comentarios>()
        x.forEach(element => {
            y.push(new ComentariosBuilder().buildFromObject(element).Build())
        });
        debugger
        y.sort((x, y) => y.Id - x.Id)
        return y

    }

}


