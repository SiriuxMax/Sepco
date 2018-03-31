
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../appSettings';
import { E_Usuario } from '../Models/E_Usuario..model';
import { UsuarioBuilder } from '../Builders/Usuario.model.builder';
import { E_Cliente } from '../Models/E_Cliente';
import { HeaderBuilder } from '../Tools/HeaderBuilder';

@Injectable()
export class UserService {
    constructor(private Http: HttpClient, private HeaderBuilder: HeaderBuilder) { }
    private UrlNow: string = AppSettings.API_URL
    private textarea: HTMLTextAreaElement;

    /** Copy the text value to the clipboard. */
    Login(User: E_Usuario): Observable<E_Usuario> {
        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(User)
        return this.Http.post(this.UrlNow + "Usuario/UsuarioxNombre"
            , request, httpOptions).map(this.ExtractDataUser)
    }

    crearCliente(CLient: E_Cliente): Observable<boolean> {
        const httpOptions = this.HeaderBuilder.HeadNow()
        var request = JSON.stringify(CLient)
        return this.Http.post(this.UrlNow + "Cliente/crearCliente"
            , request, httpOptions).map(this.EvalBool)
    }


    EvalBool(res: any): boolean {
        var a: boolean = res
        return a
    }


    ExtractDataUser(res: Response): E_Usuario {

        var x: E_Usuario = new E_Usuario()
        if (res != null) { x = new UsuarioBuilder().buildFromObject(res.json()).Build() }
        return x
    }

}


