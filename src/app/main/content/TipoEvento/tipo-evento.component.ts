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
import { AdminServices } from '../../../ApiServices/AdminServices';
import { E_Municipios } from '../../../Models/E_Municipios';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'tipo-evento',
    templateUrl: 'tipo-evento.component.html',
    styleUrls: ['tipo-evento.component.scss']
})
export class TipoEventoComponent implements OnInit {
    SucceSave: boolean;
    ListMunicipio: Array<E_Municipios> = new Array<E_Municipios>()
    ListMunicipiosGroup: Array<E_Municipios> = new Array<E_Municipios>()
    MunicipioSeleccionado: any
    dataURL: any;
    MaskedNumberNoDecimal: any[]
    form: FormGroup;
    formErrors: any;
    noFoto: boolean = true
    DepartamentoSeleccionado: any
    TipoEventoSeleccionado: any
    ListDepartamentos: Array<E_Departamentos> = new Array<E_Departamentos>()
    ListTipoEvento: Array<E_TipoReunion> = new Array<E_TipoReunion>()
    public Nombre: string;
    public descripcion: string;
    public checked;
    // Horizontal Stepper
    constructor(private formBuilder: FormBuilder,
        private ParameterService: ParameterService,
        private NavigationData: NavigationInfoService,
        private dialog: MatDialog,
        private AdminServices: AdminServices,
        private Router: Router
    ) {
        this.ParameterService.ListarTipoReunion(new E_TipoReunion())
            .subscribe((x: Array<E_TipoReunion>) => {
                console.log(x)
                this.ListTipoEvento = x
            })
        this.formErrors = {
            checked: {},
            Nombre: {},
            Descripcion: {},
        };

    }

    ngOnInit() {
        this.MaskedNumberNoDecimal = GenerateMask.Nodecimal


        this.form = this.formBuilder.group({
            checked: ['', Validators.required],
            Nombre: ['', Validators.required],
            Descripcion: ['', Validators.required],
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
        var objEvento: E_TipoReunion = new E_TipoReunion()
        objEvento.Nombre = this.form.value.Nombre
        objEvento.Descripcion = this.form.value.Descripcion
        objEvento.Estado = this.form.value.checked
        objEvento.Fecha = new Date();
        this.AdminServices.crearTipoReunion(objEvento).subscribe((x: boolean) => { this.SucceSave = x })

    }


}

