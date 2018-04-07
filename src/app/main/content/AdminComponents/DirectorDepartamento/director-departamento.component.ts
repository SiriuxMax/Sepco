import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { E_Departamentos } from 'app/Models/E_Departamentos';
import { E_DirectorDepartamento } from 'app/Models/E_DirectorDepartamento';
import { GenerateMask } from 'app/Tools/MaskedLibrary';
import { NavigationInfoService } from 'app/ApiServices/NavigationInfoService';
import { MatDialog } from '@angular/material';
import { PhotoTool } from 'app/Tools/PhotoTool';
import { E_Reunion } from 'app/Models/E_Reunion';
import { E_Imagen } from 'app/Models/E_Imagen';
import { AdminServices } from 'app/ApiServices/AdminServices';
import { E_Sector } from 'app/Models/E_Sector';
import { Router } from '@angular/router';
import { UserService } from '../../../../ApiServices/UserService';

@Component({
    moduleId: module.id,
    selector: 'director-departamento',
    templateUrl: 'director-departamento.component.html',
    styleUrls: ['director-departamento.component.scss']
})
export class DirectorDepartamentoComponent implements OnInit {
    DirectorTecnicoSector: string
    SucceSave: boolean;
    dataURL: any;
    public MaskedNumber: any[]
    MaskedNumberNoDecimal: any[]
    form: FormGroup;
    formErrors: any;
    noFoto: boolean = true
    DepartamentoSeleccionado: any
    ListDepartamentos: Array<E_Departamentos> = new Array<E_Departamentos>()
    ListSector: Array<E_Sector> = new Array<E_Sector>()
    ListSectorGroup: Array<E_Sector> = new Array<E_Sector>()
    Sectoreleccionado: any
    public Nombre: string;
    public descripcion: string;
    public checked;
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
            password: {},
            passwordConfirm: {},
            Cedula: {},
            Telefonof: {},
            Nombre: {},
            Apellido: {},
            Celular: {},
            Departamentos: {},
            Direccion: {},
            Sector: {}
        };


    }

    ReturnPage(event: Event) {
        event.preventDefault();
        this.Router.navigate(['/mainpageadmin'])
    }
    ngOnInit() {
        this.MaskedNumber = GenerateMask.numberMask
        this.MaskedNumberNoDecimal = GenerateMask.Nodecimal
        this.ParameterService.listarDepartamentos()
            .subscribe((x: Array<E_Departamentos>) => {
                this.ListDepartamentos = x
            })


        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            Cedula: ['', [Validators.required]],
            Telefonof: [''],
            Celular: ['', [Validators.required]],
            Nombre: ['', [Validators.required]],
            Apellido: ['', [Validators.required]],
            Direccion: ['', [Validators.required]],
            Departamentos: [undefined, [Validators.required]],
            Sector: [undefined, [Validators.required]],

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

    SelectedDepartamento(y) {
    
        var objSector: E_Sector = new E_Sector()
        objSector.Id_Departamento = y.value.Id
        this.ParameterService.ListarSector(objSector)
            .subscribe((x: Array<E_Sector>) => {
                this.ListSectorGroup = x
            })
 
    }



    EnviarInfo() {

        var objDirectorDepartamento: E_DirectorDepartamento = new E_DirectorDepartamento()
        objDirectorDepartamento.Cedula = this.form.value.Cedula.replace(/\./g, "");
        objDirectorDepartamento.Nombres = this.form.value.Nombre
        objDirectorDepartamento.Apellidos = this.form.value.Apellido
        objDirectorDepartamento.Direccion = this.form.value.Direccion
        objDirectorDepartamento.Correo = this.form.value.email
        objDirectorDepartamento.Telefono = this.form.value.Telefonof
        objDirectorDepartamento.Celular = this.form.value.Celular
        objDirectorDepartamento.Id_Departamento = this.form.value.Departamentos.Id
        objDirectorDepartamento.Estado = true
        objDirectorDepartamento.FechaCreacion = new Date();
        objDirectorDepartamento.Id_Sector = this.form.value.Sector
        objDirectorDepartamento.CambiarClave = true
        objDirectorDepartamento.CreadoPor = this.UserService.GetCurrentCurrentUserNow().Id;

        this.AdminServices.crearDirectorDepartamento(objDirectorDepartamento).subscribe((x: boolean) => {
            this.SucceSave = x
            if (x) { this.clearform() }
        })

    }

    clearform() {
        this.form.setValue({
            Cedula: '',
            Nombre: '',
            Apellido: '',
            Direccion: '',
            email: '',
            Telefonof: '',
            Celular: '',
            Departamentos: 0,
            Sector: 0
        })

    }

}

