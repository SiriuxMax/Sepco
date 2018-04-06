import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { ParameterService } from '../../../ApiServices/ParametersServices';
import { E_Departamentos } from '../../../Models/E_Departamentos';
import { E_Municipios } from '../../../Models/E_Municipios';
import { GenerateMask } from '../../../Tools/MaskedLibrary';
import { PhotoTool } from '../../../Tools/PhotoTool';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../../ApiServices/UserService';
import { E_Cliente } from '../../../Models/E_Cliente';
import { E_Usuario } from '../../../Models/E_Usuario';
import { Router } from '@angular/router';
import { ImageService } from '../../../ApiServices/ImageServices';
import { E_Imagen } from '../../../Models/E_Imagen';
import { AppSettings } from '../../../app.settings';


@Component({
    selector: 'fuse-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    animations: fuseAnimations
})
export class FuseRegisterComponent implements OnInit {
    ErrorText: boolean;
    successText: boolean = false;
    CapturedPhoto: boolean;
    public dataURL: any
    registerForm: FormGroup;
    registerFormErrors: any;
    fakeObservable: any;
    public ShowCamara: boolean = false
    public DepartamentoSeleccionado: string = ""
    public MunicipioSeleccionado: string = ""
    public ListDepartamentos: Array<E_Departamentos> = new Array<E_Departamentos>()
    public ListMunicipiosBase: Array<E_Municipios> = new Array<E_Municipios>()
    public ListMunicipiosGroup: Array<E_Municipios> = new Array<E_Municipios>()
    public MaskedNumber: any[]
    public MaskedNumberNoDecimal: any[]
    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private ParameterService: ParameterService,
        private UserService: UserService,
        private Router: Router,
        private ImageService: ImageService
    ) {
        this.fuseConfig.setConfig({
            layout: {
                navigation: 'none',
                toolbar: 'none',
                footer: 'none'
            }
        });

        this.registerFormErrors = {
            email: {},
            password: {},
            passwordConfirm: {},
            Cedula: {},
            Telefonof: {},
            Nombre: {},
            Apellido: {},
            Celular: {},
            Departamentos: {},
            Municipios: {}
        };
    }


    ngOnInit() {

        this.MaskedNumber = GenerateMask.numberMask
        this.MaskedNumberNoDecimal = GenerateMask.Nodecimal
        this.ParameterService.listarDepartamentos()
            .subscribe((x: Array<E_Departamentos>) => {
                this.ListDepartamentos = x
            })
        this.ParameterService.ListarMunicipios()
            .subscribe((x: Array<E_Municipios>) => {
                this.ListMunicipiosBase = x
            })

        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, confirmValidatePassword]],
            passwordConfirm: ['', [Validators.required, confirmPassword]],
            Cedula: ['', [Validators.required]],
            Telefonof: [''],
            Celular: ['', [Validators.required]],
            Nombre: ['', [Validators.required]],
            Apellido: ['', [Validators.required]],
            Departamentos: [undefined, [Validators.required]],
            Municipios: [undefined, [Validators.required]],

        });

        this.registerForm.valueChanges.subscribe(() => {
            this.onRegisterFormValuesChanged();
        });



    }

    onRegisterFormValuesChanged() {

        for (const field in this.registerFormErrors) {
            if (!this.registerFormErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.registerFormErrors[field] = {};

            // Get the control
            const control = this.registerForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.registerFormErrors[field] = control.errors;
            }
        }
    }
    SelectedDepartamento(y) {

        var depObj = this.ListDepartamentos.find(x => x.Id == y.value)
        this.ListMunicipiosGroup = this.ListMunicipiosBase.filter(x => x.Id_Departamento == Number(depObj.Codigo))
    }
    Continuar() {
        this.ShowCamara = true
        setTimeout(() => {
            PhotoTool.plauvideo()
        }, 200)
    }
    RegisterPhoto() {

        var canvas: any = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        var video: any = document.getElementById('video');
        context.drawImage(video, 0, 0, 640, 480);
        this.dataURL = canvas.toDataURL('image/jpeg', 0.5);
        this.CapturedPhoto = true

        //  this.ImageService.UploadJsonFile(fd).subscribe((x) => console.log(true))

    }

    CancelPhoto() {
        this.CapturedPhoto = false
    }
    EnviarInfo() {
        var ClientObj: E_Cliente = new E_Cliente()
        var UserObj: E_Usuario = new E_Usuario()
        var ImagenObj: E_Imagen = new E_Imagen()
        var ImageBaseUrl = AppSettings.Global().API_ImageContent
        var password = btoa(this.registerForm.value.password)
        ClientObj.Nombre = this.registerForm.value.Nombre
        ClientObj.Correo = this.registerForm.value.email
        ClientObj.Cedula = this.registerForm.value.Cedula.replace(/\./g, "");
        ClientObj.Telefono = this.registerForm.value.Telefonof
        ClientObj.Celular = this.registerForm.value.Celular
        ClientObj.Id_Departamento = this.registerForm.value.Departamentos
        ClientObj.Id_Municipio = this.registerForm.value.Municipios
        ClientObj.Apellido = this.registerForm.value.Apellido
        ClientObj.Estado = true
        ClientObj.Direccion = ""

        UserObj.Email = ClientObj.Correo
        UserObj.Estado = true
        UserObj.Passwordd = password
        UserObj.Id_Perfil = 1
        UserObj.UserName = ClientObj.Correo

        if (this.dataURL != undefined) {
            var formdata = new FormData();
            var blob = PhotoTool.dataURItoBlob(this.dataURL);
            var fd = new FormData(document.forms[0]);
            ImagenObj.Nombre = btoa(((new Date().getMilliseconds()) * Math.random()).toString())
            ImagenObj.Ruta = ImageBaseUrl + ImagenObj.Nombre + '.jpeg'
            ImagenObj.Aprobada = true
            UserObj.Imagen = ImagenObj.Ruta
            fd.append("canvasImage", blob, ImagenObj.Nombre);
            this.ImageService.UploadJsonFile(fd).subscribe((x) => {
                if (x) {
                    this.ImageService.RegistrarImagen(ImagenObj).subscribe((x => {
                        if (x) { this.RegistrarDatos(UserObj, ClientObj) }
                    }))
                }
            })
        }
        else {
            this.RegistrarDatos(UserObj, ClientObj)
        }

    }

    RegistrarDatos(User: E_Usuario, Client: E_Cliente) {
        Client.usuario = User
        this.UserService.crearCliente(Client).subscribe((x: boolean) => {
            if (x) {

                setTimeout(() => {
                    this.Router.navigate(["/login/"])
                }, 4000)

            }
        })
    }

}



function confirmPassword(control: AbstractControl) {
    if (!control.parent || !control) {
        return;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if (!password || !passwordConfirm) {
        return;
    }

    if (passwordConfirm.value === '') {
        return;
    }

    if (password.value !== passwordConfirm.value) {
        return {
            passwordsNotMatch: true
        };
    }

}
function confirmValidatePassword(control: AbstractControl) {
    if (!control.parent || !control) {
        return;
    }
    const password = control.parent.get('password');
    var texto = password.value
    var validateABC: boolean = false
    var validateLength: boolean = false
    var validateNumber: boolean = false
    var numeros = "0123456789";
    var letras = "abcdefghyjklmnñopqrstuvwxyz";
    var i
    if (texto.length > 5 && texto.length < 11) { validateLength = true }
    for (i = 0; i < texto.length; i++) {
        if (numeros.indexOf(texto.charAt(i), 0) != -1) {
            validateNumber = true
        }
    }
    texto = texto.toLowerCase();
    for (i = 0; i < texto.length; i++) {
        if (letras.indexOf(texto.charAt(i), 0) != -1) {
            validateABC = true
        }
    }
    if (validateABC && validateLength && validateNumber) {
        return;
    }
    else {
        return { passwordNotOk: true }
    }
}
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}


