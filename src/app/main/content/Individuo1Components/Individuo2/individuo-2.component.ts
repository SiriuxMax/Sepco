import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { E_TipoIndividuo2 } from 'app/Models/E_TipoIndividuo2';
import { E_Individuo2 } from 'app/Models/E_Individuo2';
import { GenerateMask } from 'app/Tools/MaskedLibrary';
import { NavigationInfoService } from 'app/ApiServices/NavigationInfoService';
import { MatDialog } from '@angular/material';
import { PhotoTool } from 'app/Tools/PhotoTool';
import { E_Reunion } from 'app/Models/E_Reunion';
import { E_Imagen } from 'app/Models/E_Imagen';
import { AdminServices } from 'app/ApiServices/AdminServices';
import { Router } from '@angular/router';
import { UserService } from '../../../../ApiServices/UserService';
import { E_Departamentos } from '../../../../Models/E_Departamentos';
import { E_Municipios } from 'app/Models/E_Municipios';
import { E_Cliente } from 'app/Models/E_Cliente';
import { E_Sector } from '../../../../Models/E_Sector';

@Component({
    moduleId: module.id,
    selector: 'individuo-2',
    templateUrl: 'individuo-2.component.html',
    styleUrls: ['individuo-2.component.scss']
})
export class Individuo2Component implements OnInit {
    ListSector: E_Sector[];
    formDinamic: FormGroup;
    ListMunicipiosBase: E_Municipios[];
    ListDepartamentos: E_Departamentos[];
    SucceSave: boolean;
    dataURL: any;
    public MaskedNumber: any[]
    MaskedNumberNoDecimal: any[]
    form: FormGroup;
    formErrors: any;
    noFoto: boolean = true
    TipoIndividuo2Seleccionado: any
    ListTipoIndividuo2: Array<E_TipoIndividuo2> = new Array<E_TipoIndividuo2>()
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
            TipoIndividuo2: {},
            Direccion: {}
        };

    }

    ReturnPage(event: Event) {
        event.preventDefault();
        this.Router.navigate(['/mainpageindividuo1'])
    }
    ngOnInit() {
        this.MaskedNumber = GenerateMask.numberMask
        this.MaskedNumberNoDecimal = GenerateMask.Nodecimal
        this.ParameterService.listarTipoIndividuo2()
            .subscribe((x: Array<E_TipoIndividuo2>) => {
                var objPerf = this.UserService.GetCurrentCurrentUserNow().Id_Perfil
                switch (objPerf) {
                    case 4: var objSelection = 1
                        break;
                    case 5: var objSelection = 2
                        break;
                    case 6: var objSelection = 3
                        break;
                    default:
                        break;
                }
                this.ListTipoIndividuo2 = x.filter((y) => y.Id_tipoindividuo1 == objSelection)
            })

        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            Cedula: ['', [Validators.required]],
            Telefonof: [''],
            Celular: ['', [Validators.required]],
            Nombre: ['', [Validators.required]],
            Apellido: ['', [Validators.required]],
            Direccion: ['', [Validators.required]],
            TipoIndividuo2: [undefined, [Validators.required]]

        });

        this.formDinamic = this.formBuilder.group({
            Municipio: [undefined, [Validators.required]],
            Nombre: [undefined, [Validators.required]],
            Sector : [undefined, [Validators.required]],
        });

        this.form.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

        var IdClienteDirector = this.UserService.GetCurrentCurrentUserNow().Id_Cliente
        var ObjClientDirector = new E_Cliente()
        ObjClientDirector.Id = IdClienteDirector
        this.UserService.ClientexId(ObjClientDirector)
            .subscribe((x: E_Cliente) => {
                var ObjSector: E_Sector = new E_Sector()
                ObjSector.Id_Departamento = x.Id_Departamento
                this.ParameterService.ListarSector(ObjSector).subscribe((x) => {
                    this.ListSector = x
                })
                this.ParameterService.listarDepartamentos()
                    .subscribe((y: Array<E_Departamentos>) => {
                        var codigoDepto = y.find((z) => z.Id == x.Id_Departamento).Codigo
                        this.ParameterService.ListarMunicipios()
                            .subscribe((w: Array<E_Municipios>) => {
                                this.ListMunicipiosBase = w.filter((w1) => w1.Id_Departamento == Number(codigoDepto))
                            })
                    })
            })



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
        var objIndividuo2: E_Individuo2 = new E_Individuo2()
        objIndividuo2.Cedula = this.form.value.Cedula
        objIndividuo2.Nombre = this.form.value.Nombre
        objIndividuo2.Apellido = this.form.value.Apellido
        objIndividuo2.Direccion = this.form.value.Direccion
        objIndividuo2.Correo = this.form.value.Correo
        objIndividuo2.Telefono = this.form.value.Telefono
        objIndividuo2.Celular = this.form.value.Celular
        objIndividuo2.Estado = true
        objIndividuo2.FechaCreacion = new Date();
        objIndividuo2.Id_Individuo1 = this.UserService.GetCurrentCurrentUserNow().Id
        objIndividuo2.Id_TipoEstadoRevision = 1 //Pendiente revision por SAC
        objIndividuo2.Id_TipoIndividuo2 = this.form.value.TipoIndividuo2
        objIndividuo2.CambiarClave = true

        //   this.AdminServices.crearIndividuo2(objIndividuo2).subscribe((x: boolean) => { this.SucceSave = x })

    }


}

