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
import { UserService } from '../../../../../ApiServices/UserService';
import { E_Departamentos } from '../../../../../Models/E_Departamentos';
import { E_Municipios } from 'app/Models/E_Municipios';
import { E_Cliente } from 'app/Models/E_Cliente';
import { E_Sector } from '../../../../../Models/E_Sector';
import { E_TipoAntecedente } from '../../../../../Models/E_TipoAntecedente';
import { E_TipoEstadoRevision } from '../../../../../Models/E_TipoEstadoRevision';

@Component({
    moduleId: module.id,
    selector: 'admin-individuo2',
    templateUrl: 'admin-individuo2.component.html',
    styleUrls: ['admin-individuo2.component.scss']
})
export class AdminIndividuo2Component implements OnInit {
    ListSector: E_Sector[];
    formDinamic: FormGroup;
    ListMunicipiosBase: E_Municipios[];
    listTipoAntecedente: E_TipoAntecedente[];
    listTipoRevision: E_TipoEstadoRevision[];
    ListDepartamentos: E_Departamentos[];
    SucceSave: boolean;
    dataURL: any;
    observaciones:any
    public MaskedNumber: any[]
    MaskedNumberNoDecimal: any[]
    form: FormGroup;
    formErrors: any;
    noFoto: boolean = true
    TipoIndividuo2Seleccionado: any
    tiporevisionselec: any
    ListTipoIndividuo2: Array<E_TipoIndividuo2> = new Array<E_TipoIndividuo2>()
    public Nombre: string;
    public descripcion: string;
    public checked;
    public xx :E_Individuo2;
    public departaseleccionado:number;
    // Horizontal Stepper
    constructor(private formBuilder: FormBuilder,
        private ParameterService: ParameterService,
        private NavigationData: NavigationInfoService,
        private dialog: MatDialog,
        private AdminServices: AdminServices,
        private Router: Router,
        private UserService: UserService,
        private navigation:NavigationInfoService
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

        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            Cedula: ['', []],
            Telefonof: [''],
            Celular: ['', [Validators.required]],
            Nombre: [''],
            Apellido: [''],
            Direccion: ['', [Validators.required]],
            TipoIndividuo2: [undefined],
            Departamento:[undefined]

        });

        debugger;

        this.xx =this.navigation.dataIndividuo2;
        console.log(this.xx);

        this.form.setValue({            
            email: this.xx.Correo,
            Cedula: this.xx.Cedula,
            Telefonof: this.xx.Telefono,
            Nombre: this.xx.Nombres,
            Apellido: this.xx.Apellidos,
            Celular: this.xx.Celular,
            TipoIndividuo2: this.xx.Id_tipoindividuo2,
            Direccion: this.xx.Direccion,
            Departamento:this.xx.Id_departamento
        })
    }

    ReturnPage(event: Event) {
        event.preventDefault();
        this.Router.navigate(['/mainpageindividuo1'])
    }
    ngOnInit() {

        this.ParameterService.listarTipoAntecedente().subscribe((x) => {
           
            this.listTipoAntecedente = x
        })

        this.ParameterService.listarTipoEstadoRevision().subscribe((x) => {
        
            this.listTipoRevision = x
        })

        this.MaskedNumber = GenerateMask.numberMask
        this.MaskedNumberNoDecimal = GenerateMask.Nodecimal
        this.ParameterService.listarTipoIndividuo2()
            .subscribe((x: Array<E_TipoIndividuo2>) => {
               
                this.ListTipoIndividuo2 = x.filter((y) => y.Id == this.xx.Id_tipoindividuo2)
                this.TipoIndividuo2Seleccionado = this.xx.Id_tipoindividuo2

            })

        
        this.formDinamic = this.formBuilder.group({
            Municipio: [undefined, [Validators.required]],
            Nombre: [undefined, [Validators.required]],
            Sector : [undefined, [Validators.required]],
        });

        this.form.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

        // var IdClienteDirector =  0// this.UserService.GetCurrentCurrentUserNow().Id_Cliente
        // var ObjClientDirector = new E_Cliente()
        // ObjClientDirector.Id = IdClienteDirector
        // this.UserService.ClientexId(ObjClientDirector)
        //     .subscribe((x: E_Cliente) => {
                
        //     })
       
        var ObjSector: E_Sector = new E_Sector()
        ObjSector.Id_Departamento = this.xx.Id_departamento
        this.ParameterService.ListarSector(ObjSector).subscribe((x) => {
        
            this.ListSector = x
        })

        this.ParameterService.listarDepartamentos().subscribe((x) => {
            debugger;
            this.ListDepartamentos = x
            this.departaseleccionado=5
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
        debugger;
        var lista = this.listTipoAntecedente
        var objIndividuo2: E_Individuo2 = new E_Individuo2()
        objIndividuo2.Cedula = this.form.value.Cedula
        objIndividuo2.Nombres = this.form.value.Nombre
        objIndividuo2.Apellidos = this.form.value.Apellido
        objIndividuo2.Direccion = this.form.value.Direccion
        objIndividuo2.Correo = this.form.value.Correo
        objIndividuo2.Telefono = this.form.value.Telefono
        objIndividuo2.Celular = this.form.value.Celular
        objIndividuo2.Activo = true
        objIndividuo2.FechaCreacion = new Date();
        objIndividuo2.Id_individuo1 = this.UserService.GetCurrentCurrentUserNow().Id
        objIndividuo2.Id_tipoestadorevision = 1 //Pendiente revision por SAC
        objIndividuo2.Id_tipoindividuo2 = this.form.value.TipoIndividuo2
        objIndividuo2.CambiarClave = true        
        



        //   this.AdminServices.crearIndividuo2(objIndividuo2).subscribe((x: boolean) => { this.SucceSave = x })

    }



}
