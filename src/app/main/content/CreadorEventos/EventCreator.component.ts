import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParameterService } from '../../../ApiServices/ParametersServices';
import { E_Departamentos } from '../../../Models/E_Departamentos';
import { E_TipoReunion } from '../../../Models/E_TipoReunion';
import { GenerateMask } from '../../../Tools/MaskedLibrary';
import { NavigationInfoService } from '../../../ApiServices/NavigationInfoService';
import { MatDialog } from '@angular/material';
import { fotoDialogComponent } from './fotoDialog/fotoDialog.component';
import { PhotoTool } from '../../../Tools/PhotoTool';
import { E_Reunion } from '../../../Models/E_Reunion';
import { E_Imagen } from '../../../Models/E_Imagen';
import { AppSettings } from '../../../appSettings';
import { ImageService } from '../../../ApiServices/ImageServices';
import { E_Municipios } from '../../../Models/E_Municipios';
import { Router } from '@angular/router';
import { debug } from 'util';

@Component({
    selector: 'EventCreator',
    templateUrl: './EventCreator.component.html',
    styleUrls: ['./EventCreator.component.scss']
})
export class EventCreatorComponent implements OnInit {
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
    // Horizontal Stepper
    constructor(private formBuilder: FormBuilder,
        private ParameterService: ParameterService,
        private NavigationData: NavigationInfoService,
        private dialog: MatDialog,
        private ImageService: ImageService,
        private Router: Router
    ) {
        console.log(JSON.stringify(this.NavigationData.storage))
        this.ParameterService.listarDepartamentos()
            .subscribe((x: Array<E_Departamentos>) => {
                this.ListDepartamentos = x
            })
        this.ParameterService.ListarMunicipios()
            .subscribe((x: Array<E_Municipios>) => {
                console.log(x)
                this.ListMunicipiosGroup = x
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
            Municipio: {},
            Personas: {}
        };

    }
    SelectedDepartamento(y) {

        this.ListMunicipio = this.ListMunicipiosGroup.filter(x => x.Id_Departamento == Number(y.value.Codigo))
    }
    ngOnInit() {
        this.MaskedNumberNoDecimal = GenerateMask.Nodecimal


        this.form = this.formBuilder.group({

            Nombre: ['', Validators.required],
            Descripcion: ['', Validators.required],
            Departamentos: [undefined, Validators.required],
            Municipio: [undefined, Validators.required],
            TipoEvento: [undefined, Validators.required],
            Personas: ['', Validators.required],
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
            height: '450px',
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result != undefined) {
                this.dataURL = result
                this.noFoto = false
            }

        });
    }
    EnviarInfo() {

        var objEvento: E_Reunion = new E_Reunion()
        objEvento.Titulo = this.form.value.Nombre
        objEvento.Descripcion = this.form.value.Descripcion
        objEvento.Id_Departamento = this.form.value.Departamentos.Id
        objEvento.NombreDepartamento = this.form.value.Departamentos.Nombre
        objEvento.CantidadPersonas = this.form.value.Personas
        objEvento.Id_TipoReunion = this.form.value.TipoEvento
        objEvento.Id_Municipio = this.form.value.Municipio.Id
        var ImagenObj: E_Imagen = new E_Imagen()
        var ImageBaseUrl = AppSettings.API_ImageContent

        if (this.dataURL != undefined) {
            var formdata = new FormData();
            var blob = PhotoTool.dataURItoBlob(this.dataURL);
            var fd = new FormData(document.forms[0]);
            ImagenObj.Nombre = btoa(((new Date().getMilliseconds()) * Math.random()).toString())
            ImagenObj.Ruta = ImageBaseUrl + ImagenObj.Nombre + '.jpeg'
            ImagenObj.aprobada = true
            fd.append("canvasImage", blob, ImagenObj.Nombre);
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
                                    }, 4000)
                                }
                            }))
                        }
                    })
                }

            })



        }
    }


}
