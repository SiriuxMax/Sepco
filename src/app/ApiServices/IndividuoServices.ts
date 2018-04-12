
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { AppSettings } from '../app.settings';
import { HeaderBuilder } from '../Tools/HeaderBuilder';
import { UserService } from 'app/ApiServices/UserService';
import { E_Usuario } from 'app/Models/E_Usuario';
import { E_Individuo2 } from 'app/Models/E_Individuo2';
import { Individuo2Builder } from '../Builders/Individuo2.model.builder';
import { Individuo1Builder } from 'app/Builders/Individuo1.model.builder';
import { E_Individuo1 } from 'app/Models/E_Individuo1';


@Injectable()
export class IndividuoServices {
    constructor(private Http: HttpClient, private HeaderBuilder: HeaderBuilder, private UserService: UserService) { }
    private UrlNow: string = AppSettings.Global().API

    crearIndividuo2(CLient: E_Individuo2): Observable<boolean> {
        var User: E_Usuario = this.UserService.GetCurrentCurrentUserNow()
        const httpOptions = this.HeaderBuilder.HeadNow(User.Id)
        var request = JSON.stringify(CLient)
        return this.Http.post(this.UrlNow + "Individuo/crearIndividuo2"
            , request, httpOptions).map(this.EvalBool)
    }
    Individuo1xCorreo(CLient: E_Individuo1): Observable<E_Individuo1> {
        var User: E_Usuario = this.UserService.GetCurrentCurrentUserNow()
        const httpOptions = this.HeaderBuilder.HeadNow(User.Id)
        var request = JSON.stringify(CLient)
        return this.Http.post(this.UrlNow + "Individuo/Individuo1xCorreo"
            , request, httpOptions).map(this.ExtractIndivduo1)
    }

    ExtractIndivduo1(res: any) {
        return new Individuo1Builder().buildFromObject(res).Build()
    }

    EvalBool(res: any): boolean {
        var a: boolean = res
        return a
    }

}

