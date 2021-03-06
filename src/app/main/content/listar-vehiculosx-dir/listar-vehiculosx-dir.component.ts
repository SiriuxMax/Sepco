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

import { ReunionBuilder } from 'app/Builders/Reunion.model.builder';
import { ReunionService } from 'app/ApiServices/ReunionService';
import { Router } from '@angular/router';
import { E_Municipios } from 'app/Models/E_Municipios';
import { AdminServices } from '../../../ApiServices/AdminServices';
import { E_Metas } from '../../../Models/E_Metas';
import { E_DirectorDepartamento } from '../../../Models/E_DirectorDepartamento';
import { UserService } from '../../../ApiServices/UserService';
import { E_Vehiculo } from '../../../Models/E_Vehiculo';

@Component({
    moduleId: module.id,
    selector: 'listar-vehiculosx-dir',
    templateUrl: 'listar-vehiculosx-dir.component.html',
    styleUrls: ['listar-vehiculosx-dir.component.scss']
})
export class ListarVehiculosxDirComponent implements OnInit {
    rows = [];
    public directordepto:E_DirectorDepartamento;
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
        private MetasService: AdminServices,public userservices:UserService) {

        if (this.NavigationData.storage == undefined) {}// this.Router.navigate(["/Maps"]) }
     //   this.DatoDepto = this.NavigationData.storage.IdDepto


        // NumeroEventos: NUmero, Nombre: TextX, CodigoDepto: CodigoDepto ,IdDepto:IdDepto
    }

    ReturnPage(event:Event){
        event.preventDefault();
        this.Router.navigate(['/mainpageadmin'])
     }
    ObtenerReuniones() {
        
        var Objdire: E_DirectorDepartamento = new E_DirectorDepartamento()
        var xxx = this.userservices.GetCurrentCurrentUserNow().UserName
        Objdire.Correo = xxx;
        this.MetasService.directorxCorreo(Objdire).subscribe((x) => {
            
            this.directordepto = x;            
        });

        var ObjReu: E_Vehiculo = new E_Vehiculo()
        ObjReu.Id_directordepto = this.directordepto.Id;
        this.MetasService.listarVehiculoxDir(ObjReu).subscribe((x) => {
            
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
        // this.ImageService.imagenesFiltro(ima).subscribe((x) => {
        //     ;
        //     this.rows = x;
        //     this.loadingIndicator = false;
        // });
                
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
        
        // console.log(x)
        // const dialogRef = this.dialog.open(OkImageComponent, {            
        //     data: x.selected[0]
        // });

        // dialogRef.afterClosed().subscribe(result => {
        //     if (result) {
        //         this.ObtenerReuniones();
        //     }

        // });
    }
}

