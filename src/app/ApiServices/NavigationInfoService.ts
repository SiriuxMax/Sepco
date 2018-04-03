import { Injectable } from '@angular/core';
import { E_Reunion } from '../Models/E_Reunion';

@Injectable()
export class NavigationInfoService {

    public storage: any;
    public dataEvento: E_Reunion
    public constructor() { }

}