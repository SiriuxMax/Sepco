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
import { ReunionBuilder } from '../../../Builders/Reunion.model.builder';
import { ReunionService } from '../../../ApiServices/ReunionService';
import { Router } from '@angular/router';


@Component({
    selector: 'VisorEvent',
    templateUrl: './VisorEvent.component.html',
    styleUrls: ['./VisorEvent.component.scss']
})
export class VisorEventComponent implements OnInit {
    rows = [];

    selected = [];
    loadingIndicator = true;
    reorderable = true;
    DeptoName = ""
    DatoDepto: any
    constructor(private NavigationData: NavigationInfoService,
        private ReunionService: ReunionService,
        private Router: Router,
        private dialog: MatDialog) {

        if (this.NavigationData.storage == undefined) { this.Router.navigate(["/Maps"]) }
        this.DatoDepto = this.NavigationData.storage.IdDepto


        // NumeroEventos: NUmero, Nombre: TextX, CodigoDepto: CodigoDepto ,IdDepto:IdDepto
    }
    ObtenerReuniones() {
        var ObjReu: E_Reunion = new E_Reunion()
        ObjReu.Id_Departamento = this.DatoDepto
        this.ReunionService.ReunionesxDepto(ObjReu).subscribe((x) => {
            this.rows = x;
            this.loadingIndicator = false;
        }


        )
    }


    ngOnInit() {


        this.loadingIndicator = true;
        this.ObtenerReuniones()

    }
    selectedEvent(x) {
        console.log(x)
        const dialogRef = this.dialog.open(DetailDialogComponent, {
            //    height: '450px',
            data:x
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result != undefined) {

            }

        });
    }
}
