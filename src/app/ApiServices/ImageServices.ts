
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../appSettings';
import { E_Usuario } from '../Models/E_Usuario..model';
import { UsuarioBuilder } from '../Builders/Usuario.model.builder';
import { E_Cliente } from '../Models/E_Cliente';

@Injectable()
export class ImageService {
    constructor(private Http: HttpClient) { }
    private UrlNow: string = AppSettings.API_URL
    private textarea: HTMLTextAreaElement;

    private setOptions() {
        //  const headers = new Headers({ 'Content-Type': 'application/json' });
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
              //  'Content-Type': 'multipart/form-data'
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

    /** Copy the text value to the clipboard. */
    Login(User: E_Usuario): Observable<E_Usuario> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        var request = JSON.stringify(User)
        return this.Http.post(this.UrlNow + "Usuario/UsuarioxNombre"
            , request, httpOptions).map(this.ExtractDataUser)
    }

    crearCliente(CLient: E_Cliente): Observable<E_Usuario> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Userid': '0',
            })
        };
        var request = JSON.stringify(CLient)
        return this.Http.post(this.UrlNow + "Usuario/UsuarioxNombre"
            , request, httpOptions).map(this.ExtractDataUser)
    }



    ExtractDataUser(res: Response): E_Usuario {

        var x: E_Usuario = new E_Usuario()
        if (res != null) { x = new UsuarioBuilder().buildFromObject(res.json()).Build() }
        return x
    }

}


