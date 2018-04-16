import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { GenerateMask } from 'app/Tools/MaskedLibrary';
import { NavigationInfoService } from 'app/ApiServices/NavigationInfoService';
import { MatDialog } from '@angular/material';
import { PhotoTool } from 'app/Tools/PhotoTool';
import { E_Reunion } from 'app/Models/E_Reunion';
import { E_Imagen } from 'app/Models/E_Imagen';
import { AdminServices } from 'app/ApiServices/AdminServices';
import { Router } from '@angular/router';
import { UserService } from '../../../../ApiServices/UserService';
import { E_Departamentos } from 'app/Models/E_Departamentos';
import { E_Impugnacion } from 'app/Models/E_Impugnacion';
import { E_Metas } from 'app/Models/E_Metas';
import { E_TipoImpugnacion } from '../../../../Models/E_TipoImpugnacion';
import { E_SitioEscrutino } from 'app/Models/E_SitioEscrutino';
import { E_Mesa } from 'app/Models/E_Mesa';

@Component({
    moduleId: module.id,
    selector: 'impugnacion',
    templateUrl: 'impugnacion.component.html',
    styleUrls: ['impugnacion.component.scss']
})
export class ImpugnacionComponent implements OnInit {
    DepartamentoSeleccionado: any
    SucceSave: boolean;
    dataURL: any;
    ListDepartamentos: any
    MunicipioSeleccionado: any
    ListMunicipiosGroup:any
    ListZonaElectoralGroup:any
    ListPuestoVotacionGroup:any
    public MaskedNumber: any[]
    MaskedNumberNoDecimal: any[]
    form: FormGroup;
    formErrors: any;
    noFoto: boolean = true
    TipoImpugnacionSeleccionado: any
    ListTipoImpugnacion: Array<E_TipoImpugnacion> = new Array<E_TipoImpugnacion>()
    SitioEscrutinoSeleccionado: any
    ListSitioEscrutino: Array<E_SitioEscrutino> = new Array<E_SitioEscrutino>()
    MesaSeleccionado: any
    ListMesa: Array<E_Mesa> = new Array<E_Mesa>()
    PuestoVotacionSeleccionado: any
    public Nombre: string;
    public descripcion: string;
    public checkedActivo;
    // Horizontal Stepper
    constructor(private formBuilder: FormBuilder,
        private ParameterService: ParameterService,
        private NavigationData: NavigationInfoService,
        private dialog: MatDialog,
        private AdminServices: AdminServices,
        private Router: Router,
        private UserService: UserService
    ) {

        this.formErrors = {

            TipoImpugnacion: {},
            Descripcion: {},
            SitioEscrutino: {},
            Departamentos: {},
            Municipios: {},
            ZonaElectoral: {},
            PuestoVotacion: {},
            Mesa: {}
        };

    }

    ReturnPage(event: Event) {
        event.preventDefault();
        this.Router.navigate(['/mainpageadmin'])
    }
    ngOnInit() {
        this.MaskedNumber = GenerateMask.numberMask
        this.MaskedNumberNoDecimal = GenerateMask.Nodecimal

        /*    this.ParameterService.listarTipoImpugnacion()
                .subscribe((x: Array<E_TipoImpugnacion>) => {
                    this.ListTipoImpugnacion = x
                })*/

        this.ParameterService.listarSitioEscrutino()
            .subscribe((x: Array<E_SitioEscrutino>) => {
                this.ListSitioEscrutino = x
            })

        var objMesas: E_Mesa = new E_Mesa()
        objMesas.Id_puestoVotacion = this.PuestoVotacionSeleccionado;
        this.ParameterService.listarMesasxIdPuestoVotacion(objMesas)
            .subscribe((x: Array<E_Mesa>) => {
                this.ListMesa = x
            })

        this.form = this.formBuilder.group({

            TipoImpugnacion: [undefined, [Validators.required]],
            Descripcion: ['', [Validators.required]],
            SitioEscrutino: [undefined, [Validators.required]],
            Departamentos: [undefined, [Validators.required]],
            Municipios: [undefined, [Validators.required]],
            ZonaElectoral: [undefined, [Validators.required]],
            PuestoVotacion: [undefined, [Validators.required]],
            Mesa: [undefined, [Validators.required]]
        });

        this.form.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

    }

    onFormValuesChanged() {

        for (const field in this.formErrors) {
            if (!this.formErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.formErrors[field] = {};

            // Get the control
            const control = this.form.get(field);

            if (control && control.dirty && !control.valid) {
                this.formErrors[field] = control.errors;
            }
        }
    }

    EnviarInfo() {

        var objImpugnacion: E_Impugnacion = new E_Impugnacion()
        objImpugnacion.Id_Individuo2 = 1//TODO: Poner el Id del testigo en sesion.
        objImpugnacion.Id_TipoImpugnacion = this.form.value.Id_TipoImpugnacion
        objImpugnacion.Descripcion = this.form.value.Descripcion
        objImpugnacion.Id_Depto = this.form.value.Id_Depto
        objImpugnacion.Id_Municipio = this.form.value.Id_Municipio
        objImpugnacion.Id_ZonaElectoral = this.form.value.Id_ZonaElectoral
        objImpugnacion.Id_PuestoVotacion = this.form.value.Id_PuestoVotacion
        objImpugnacion.Id_Mesa = this.form.value.Id_Mesa
        objImpugnacion.Id_SitioEscrutino = this.form.value.Id_SitioEscrutino
        objImpugnacion.Id_EstadoImpugnacion = this.form.value.Id_EstadoImpugnacion
        //*objImpugnacion.FechaCreacion = new Date();      

        this.AdminServices.crearImpugnacion(objImpugnacion).subscribe((x: boolean) => {
            this.SucceSave = x
            this.CleanForm()
        })

    }
    CleanForm() {
        this.form.setValue({
            TipoImpugnacion: 0,
            Descripcion: "",
            SitioEscrutino: 0,
            Departamentos: 0,
            Municipios: 0,
            ZonaElectoral: 0,
            PuestoVotacion: 0,
            Mesa: 0
        })
    }


}

