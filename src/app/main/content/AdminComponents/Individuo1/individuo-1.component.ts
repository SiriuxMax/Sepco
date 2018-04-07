import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { E_TipoIndividuo1 } from 'app/Models/E_TipoIndividuo1';
import { E_Individuo1 } from 'app/Models/E_Individuo1';
import { GenerateMask } from 'app/Tools/MaskedLibrary';
import { NavigationInfoService } from 'app/ApiServices/NavigationInfoService';
import { MatDialog } from '@angular/material';
import { PhotoTool } from 'app/Tools/PhotoTool';
import { E_Reunion } from 'app/Models/E_Reunion';
import { E_Imagen } from 'app/Models/E_Imagen';
import { AdminServices } from 'app/ApiServices/AdminServices';
import { Router } from '@angular/router';
import { UserService } from '../../../../ApiServices/UserService';

@Component({
    moduleId: module.id,
    selector: 'individuo-1',
    templateUrl: 'individuo-1.component.html',
    styleUrls: ['individuo-1.component.scss']
})
export class Individuo1Component implements OnInit {
    SucceSave: boolean;   
    dataURL: any;
    public MaskedNumber: any[]
    MaskedNumberNoDecimal: any[]
    form: FormGroup;
    formErrors: any;
    noFoto: boolean = true
    TipoIndividuo1Seleccionado: any
    ListTipoIndividuo1: Array<E_TipoIndividuo1> = new Array<E_TipoIndividuo1>() 
    public Nombre: string;
    public descripcion: string;
    public checked;
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
            email: {},
            Cedula: {},
            Telefonof: {},
            Nombre: {},
            Apellido: {},
            Celular: {},
            TipoIndividuo1: {},     
            Direccion: {}
        };

    }

    ReturnPage(event:Event){
        event.preventDefault();
        this.Router.navigate(['/mainpageadmin'])
     }
    ngOnInit() {
        this.MaskedNumber = GenerateMask.numberMask
        this.MaskedNumberNoDecimal = GenerateMask.Nodecimal
        this.ParameterService.listarTipoIndividuo1()
            .subscribe((x: Array<E_TipoIndividuo1>) => {
                this.ListTipoIndividuo1 = x
            })
       
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],        
            Cedula: ['', [Validators.required]],
            Telefonof: [''],
            Celular: ['', [Validators.required]],
            Nombre: ['', [Validators.required]],
            Apellido: ['', [Validators.required]],
            Direccion: ['', [Validators.required]],
            TipoIndividuo1: [undefined, [Validators.required]]

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
        var objIndividuo1: E_Individuo1 = new E_Individuo1()
        objIndividuo1.Cedula = this.form.value.Cedula
        objIndividuo1.Nombre = this.form.value.Nombre
        objIndividuo1.Apellido = this.form.value.Apellido
        objIndividuo1.Direccion = this.form.value.Direccion
        objIndividuo1.Correo = this.form.value.Correo
        objIndividuo1.Telefono = this.form.value.Telefono
        objIndividuo1.Celular = this.form.value.Celular       
        objIndividuo1.Estado = true
        objIndividuo1.FechaCreacion = new Date();
        objIndividuo1.Id_DirectorDepartamento = this.UserService.GetCurrentCurrentUserNow().Id
        objIndividuo1.Id_TipoIndividuo1 = this.form.value.TipoIndividuo1
        objIndividuo1.Id_TipoEstadoRevision = 1 //Pendiente revision por SAC
        objIndividuo1.CambiarClave = true
                
        this.AdminServices.crearIndividuo1(objIndividuo1).subscribe((x: boolean) => { this.SucceSave = x })

    }


}

