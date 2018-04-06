import { Component, OnInit } from '@angular/core';
import { E_Reunion } from '../../../Models/E_Reunion';
import { NavigationInfoService } from '../../../ApiServices/NavigationInfoService';
import { ImageService } from '../../../ApiServices/ImageServices';
import { E_Imagen } from '../../../Models/E_Imagen';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ReunionService } from '../../../ApiServices/ReunionService';
import { E_Comentarios } from '../../../Models/E_Comentarios';
import { UserService } from '../../../ApiServices/UserService';
import { E_Usuario } from '../../../Models/E_Usuario';
import { Router } from '@angular/router';

@Component({
    selector: 'DetailEvent',
    templateUrl: './DetailEvent.component.html',
    styleUrls: ['./DetailEvent.component.scss']
})
export class DetailEventComponent implements OnInit {

    registerForm: FormGroup;
    imageUrl: string
    dataEvento: E_Reunion = new E_Reunion()
    ImagenGeneral: E_Imagen = new E_Imagen()
    ListComentarios: Array<E_Comentarios> = new Array<E_Comentarios>()
    registerFormErrors: any;
    constructor(private NavigationData: NavigationInfoService,
        private ImageService: ImageService,
        private formBuilder: FormBuilder,
        private ReunionService: ReunionService,
        private UserService: UserService,
        private Router: Router
    ) {


    }

    ReturnPage(){
        this.Router.navigate(['/eventvisor'])
    }
    ngOnInit(): void {
        var ImaObj: E_Imagen = new E_Imagen()
        
        if (this.NavigationData.dataEvento == undefined) { this.Router.navigate(['/Maps']) }
        this.dataEvento = this.NavigationData.dataEvento != undefined ? this.NavigationData.dataEvento : new E_Reunion()
        ImaObj.Id_Reunion = this.dataEvento.Id
        this.ImageService.ImagenxReunion(ImaObj).subscribe((x) => {
            this.ImagenGeneral = x
            this.imageUrl = x.Ruta
            var Comentario: E_Comentarios = new E_Comentarios()
            Comentario.Id_Imagen = x.Id
            this.ReunionService.ComentariosXImagen(Comentario)
                .subscribe((x) => { this.ListComentarios = x })
        })
        this.registerFormErrors = {
            Comentario: {},
        }
        this.registerForm = this.formBuilder.group({
            Comentario: ['', [Validators.required]],
        })

        this.registerForm.valueChanges.subscribe(() => {
            this.onRegisterFormValuesChanged();
        });
    }

    EnviarInfo() {
        var Comentario: E_Comentarios = new E_Comentarios()
        var Usuario: E_Usuario = this.UserService.GetCurrentCurrentUserNow()
        Comentario.Descripcion = this.registerForm.value.Comentario
        Comentario.Id_Imagen = this.ImagenGeneral.Id
        Comentario.Id_usuario = Usuario.Id
        Comentario.Estado = true
        this.ReunionService.crearComentario(Comentario).subscribe((x: number) => {
            console.log(x)
            if (x != 0) {
                this.ReunionService.ComentariosXImagen(Comentario)
                    .subscribe((x) => { this.ListComentarios = x })
            }
        })
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
}
