import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParameterService } from '../../../ApiServices/ParametersServices';
import { E_Departamentos } from '../../../Models/E_Departamentos';
import { E_TipoReunion } from '../../../Models/E_TipoReunion';
import { GenerateMask } from '../../../Tools/MaskedLibrary';
import { NavigationInfoService } from '../../../ApiServices/NavigationInfoService';
import { MatDialog } from '@angular/material';

import { PhotoTool } from '../../../Tools/PhotoTool';
import { E_Reunion } from '../../../Models/E_Reunion';
import { E_Imagen } from '../../../Models/E_Imagen';
import { AppSettings } from '../../../appSettings';
import { ImageService } from '../../../ApiServices/ImageServices';
import { DetailDialogComponent } from './DetailDialog/DetailDialog.component';

@Component({
    selector: 'VisorEvent',
    templateUrl: './VisorEvent.component.html',
    styleUrls: ['./VisorEvent.component.scss']
})
export class VisorEventComponent implements OnInit {
    rows: any[];
    loadingIndicator = true;
    reorderable = true;
    DeptoName = ""
    DatoDepto: any
    constructor(private NavigationData: NavigationInfoService) {
        
        this.DatoDepto = this.NavigationData.storage
       // NumeroEventos: NUmero, Nombre: TextX, CodigoDepto: CodigoDepto
    }

    ngOnInit() {

        this.rows = [];
        this.loadingIndicator = false;

    }
}
