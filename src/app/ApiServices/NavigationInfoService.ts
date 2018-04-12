import { Injectable } from '@angular/core';
import { E_Reunion } from '../Models/E_Reunion';
import { E_Individuo2 } from '../Models/E_Individuo2';

@Injectable()
export class NavigationInfoService {

    public storage: any;
    public dataEvento: E_Reunion
    public dataIndividuo2: E_Individuo2
    public constructor() { }

}