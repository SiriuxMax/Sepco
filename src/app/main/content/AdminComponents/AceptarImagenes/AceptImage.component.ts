import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { E_Departamentos } from 'app/Models/E_Departamentos';
import { E_TipoReunion } from 'app/Models/E_TipoReunion';
import { GenerateMask } from 'app/Tools/MaskedLibrary';
import { NavigationInfoService } from 'app/ApiServices/NavigationInfoService';
import { MatDialog } from '@angular/material';

import { PhotoTool } from 'app/Tools/PhotoTool';
import { E_Reunion } from 'app/Models/E_Reunion';
import { E_Imagen } from 'app/Models/E_Imagen';
import { AppSettings } from 'app/app.settings';
import { ImageService } from 'app/ApiServices/ImageServices';
import { OkImageComponent } from './OkImage/OkImage.component';
import { ReunionBuilder } from 'app/Builders/Reunion.model.builder';
import { ReunionService } from 'app/ApiServices/ReunionService';
import { Router } from '@angular/router';
import { E_Municipios } from 'app/Models/E_Municipios';


@Component({
    selector: 'AceptImage',
    templateUrl: './AceptImage.component.html',
    styleUrls: ['./AceptImage.component.scss']
})
export class AceptImageComponent implements OnInit {
    rows = [];
    public DepartamentoSeleccionado: string = ""
    public MunicipioSeleccionado: string = ""
    public ListDepartamentos: Array<E_Departamentos> = new Array<E_Departamentos>()
    public ListMunicipiosBase: Array<E_Municipios> = new Array<E_Municipios>()
    public ListMunicipiosGroup: Array<E_Municipios> = new Array<E_Municipios>()
    public nombrefil:string;
    public cedula:string;
    public Aprobada:number;
    selected = [];
    loadingIndicator = true;
    reorderable = true;
    DeptoName = ""
    DatoDepto: any
    ListImage: Array<E_Imagen> = new Array<E_Imagen>();
    constructor(private NavigationData: NavigationInfoService,
        private ParameterService: ParameterService,
        private ReunionService: ReunionService,
        private Router: Router,
        private dialog: MatDialog,
        private ImageService: ImageService) {

        if (this.NavigationData.storage == undefined) {}// this.Router.navigate(["/Maps"]) }
     //   this.DatoDepto = this.NavigationData.storage.IdDepto


        // NumeroEventos: NUmero, Nombre: TextX, CodigoDepto: CodigoDepto ,IdDepto:IdDepto
    }

    ReturnPage(event:Event){
        event.preventDefault();
        this.Router.navigate(['/mainpageadmin'])
     }
    ObtenerReuniones() {
        
        var ObjReu: E_Imagen = new E_Imagen()
        //ObjReu.Id_Departamento = this.DatoDepto
        this.ImageService.ListarImagenesPendientes().subscribe((x) => {
            debugger
            this.rows = x;
            this.loadingIndicator = false;
        }


        )
    }

    SelectedDepartamento(y) {

        var depObj = this.ListDepartamentos.find(x => x.Id == y.value)
        this.ListMunicipiosGroup = this.ListMunicipiosBase.filter(x => x.Id_Departamento == Number(depObj.Codigo))
    }

    filtrar() {
        
        var ima: E_Imagen = new E_Imagen();
        ima.Nombre = this.nombrefil == undefined ? null : this.cedula ;
        ima.Cedula = this.cedula == undefined ? null : this.cedula ;
        this.ImageService.imagenesFiltro(ima).subscribe((x) => {
            ;
            this.rows = x;
            this.loadingIndicator = false;
        });
                
    }

    ngOnInit() {

        this.ParameterService.listarDepartamentos()
            .subscribe((x: Array<E_Departamentos>) => {
                this.ListDepartamentos = x
            })
        this.ParameterService.ListarMunicipios()
            .subscribe((x: Array<E_Municipios>) => {
                this.ListMunicipiosBase = x
            })
        this.loadingIndicator = true;
        this.ObtenerReuniones()

    }
    selectedEvent(x) {
        
        console.log(x)
        const dialogRef = this.dialog.open(OkImageComponent, {            
            data: x.selected[0]
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.ObtenerReuniones();
            }

        });
    }
}
