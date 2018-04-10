import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { E_Departamentos } from 'app/Models/E_Departamentos';
import { E_TipoReunion } from 'app/Models/E_TipoReunion';
import { GenerateMask } from '../../../../Tools/MaskedLibrary';
import { NavigationInfoService } from 'app/ApiServices/NavigationInfoService';
import { MatDialog } from '@angular/material';
import { fotoDialogComponent } from './fotoDialog/fotoDialog.component';
import { PhotoTool } from '../../../../Tools/PhotoTool';
import { E_Reunion } from 'app/Models/E_Reunion';
import { E_Imagen } from 'app/Models/E_Imagen';

import { ImageService } from 'app/ApiServices/ImageServices';
import { Router } from '@angular/router';
import { debug } from 'util';
import { AppSettings } from '../../../../app.settings';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { E_Sector } from '../../../../Models/E_Sector';
import { E_DirectorDepartamento } from '../../../../Models/E_DirectorDepartamento';
import { AdminServices } from 'app/ApiServices/AdminServices';

@Component({
    selector: 'EventCreator',
    templateUrl: './EventCreator.component.html',
    styleUrls: ['./EventCreator.component.scss']
})
export class EventCreatorComponent implements OnInit {
    DirectorTecnicoSector: string;
    SucceSave: boolean;

    dataURL: any;
    MaskedNumberNoDecimal: any[]
    MaskPrice: any[]
    form: FormGroup;
    formErrors: any;
    noFoto: boolean = true
    DepartamentoSeleccionado: any
    TipoEventoSeleccionado: any
    ListSector: Array<E_Sector> = new Array<E_Sector>()
    ListDepartamentos: Array<E_Departamentos> = new Array<E_Departamentos>()
    ListTipoEvento: Array<E_TipoReunion> = new Array<E_TipoReunion>()
    // Horizontal Stepper
    constructor(private formBuilder: FormBuilder,
        private ParameterService: ParameterService,
        private NavigationData: NavigationInfoService,
        private dialog: MatDialog,
        private ImageService: ImageService,
        private Router: Router,
        private AdminServices: AdminServices
    ) {

        this.ParameterService.listarDepartamentos()
            .subscribe((x: Array<E_Departamentos>) => {
                this.ListDepartamentos = x
            })


        this.ParameterService.ListarTipoReunion(new E_TipoReunion())
            .subscribe((x: Array<E_TipoReunion>) => {
                console.log(x)
                this.ListTipoEvento = x
            })
        this.formErrors = {

            Nombre: {},
            Descripcion: {},
            Departamentos: {},
            TipoEvento: {},
            Sector: {},
            Personas: {},
            Costo: {}
        };

    }

    SelectedDepartamento(y) {
        this.DirectorTecnicoSector = "Sin Asignación"
        var objDir: E_DirectorDepartamento = new E_DirectorDepartamento()
        objDir.Id_Departamento = y.value.Id
        var objSector: E_Sector = new E_Sector()
        objSector.Id_Departamento = y.value.Id
        this.ParameterService.ListarSector(objSector)
            .subscribe((x: Array<E_Sector>) => {
                this.ListSector = x
            })
        this.AdminServices.ListarDirectorDepto(objDir)
            .subscribe((x: Array<E_DirectorDepartamento>) => {
                if (x.length > 0) {
                    this.DirectorTecnicoSector = x[0].Nombres + ' ' + x[0].Apellidos
                }

            })
    }

    ngOnInit() {
        this.MaskedNumberNoDecimal = GenerateMask.Nodecimal
        this.MaskPrice = GenerateMask.numberMask

        this.form = this.formBuilder.group({

            Nombre: ['', Validators.required],
            Descripcion: ['', Validators.required],
            Departamentos: [undefined, Validators.required],
            Sector: [undefined, Validators.required],
            TipoEvento: [undefined, Validators.required],
            Personas: ['', Validators.required],
            Costo: ['', Validators.required],
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

    AbrirCamara() {
        const dialogRef = this.dialog.open(fotoDialogComponent, {
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result != undefined) {
                this.dataURL = result
                this.noFoto = false
            }

        });
    }

    ReturnPage(event: Event) {
        event.preventDefault();
        this.Router.navigate(['/Maps'])
    }
    EnviarInfo() {

        var objEvento: E_Reunion = new E_Reunion()
        objEvento.Titulo = this.form.value.Nombre
        objEvento.Descripcion = this.form.value.Descripcion
        objEvento.Id_Departamento = this.form.value.Departamentos.Id
        objEvento.NombreDepartamento = this.form.value.Departamentos.Nombre
        objEvento.CantidadPersonas = this.form.value.Personas
        objEvento.Id_TipoReunion = this.form.value.TipoEvento
        objEvento.Id_Sector = this.form.value.Sector.Id
        objEvento.Costo = this.form.value.Costo.replace(/\./g, "");
        var ImagenObj: E_Imagen = new E_Imagen()
        var ImageBaseUrl = AppSettings.Global().API_ImageContent
        
        if (this.dataURL != undefined) {
            var formdata = new FormData();
            //  var blob = PhotoTool.dataURItoBlob(this.dataURL);
            var fd = new FormData(document.forms[0]);
            ImagenObj.Nombre = btoa(((new Date().getMilliseconds()) * Math.random()).toString())
            ImagenObj.Ruta = ImageBaseUrl + ImagenObj.Nombre + '.jpeg'
            ImagenObj.Aprobada = true
            fd.append("canvasImage", this.dataURL, ImagenObj.Nombre);
            this.ImageService.crearReunion(objEvento).subscribe((IdReunion) => {
                if (IdReunion != 0) {
                    ImagenObj.Id_Reunion = IdReunion
                    this.ImageService.UploadJsonFile(fd).subscribe((x) => {
                        if (x) {
                            this.ImageService.RegistrarImagen(ImagenObj).subscribe((x => {
                                if (x) {
                                    this.SucceSave = true
                                    setTimeout(() => {
                                        this.Router.navigate(["/Maps/"])
                                    }, 2000)
                                }
                            }))
                        }
                    })
                }

            })
        }
        else {
            this.ImageService.crearReunion(objEvento).subscribe((IdReunion) => {
                if (IdReunion != 0) {
                    ImagenObj.Nombre = 'RutaNula'
                    ImagenObj.Ruta = 'RutaNula'
                    ImagenObj.Aprobada = true
                    ImagenObj.Id_Reunion = IdReunion
                    this.ImageService.RegistrarImagen(ImagenObj).subscribe((x => {
                        if (x) {
                            this.SucceSave = true
                            setTimeout(() => {
                                this.Router.navigate(["/Maps/"])
                            }, 2000)
                        }
                    }))
                }

            })

        }

    }
}

