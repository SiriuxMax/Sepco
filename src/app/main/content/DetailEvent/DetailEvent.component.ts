import { Component, OnInit } from '@angular/core';
import { E_Reunion } from '../../../Models/E_Reunion';
import { NavigationInfoService } from '../../../ApiServices/NavigationInfoService';
import { ImageService } from '../../../ApiServices/ImageServices';
import { E_Imagen } from '../../../Models/E_Imagen';

@Component({
    selector: 'DetailEvent',
    templateUrl: './DetailEvent.component.html',
    styleUrls: ['./DetailEvent.component.scss']
})
export class DetailEventComponent implements OnInit {
    imageUrl: string
    dataEvento: E_Reunion = new E_Reunion()
    ImagenGeneral: E_Imagen = new E_Imagen()
    constructor(private NavigationData: NavigationInfoService,
        private ImageService: ImageService) {


    }
    ngOnInit(): void {
        var ImaObj: E_Imagen = new E_Imagen()
        this.dataEvento = this.NavigationData.dataEvento != undefined ? this.NavigationData.dataEvento : new E_Reunion()
        ImaObj.Id_Reunion = this.dataEvento.Id
        this.ImageService.ImagenxReunion(ImaObj).subscribe((x) => {
            
            this.ImagenGeneral = x
            this.imageUrl = x.Ruta
            console.log(x)
        })
    }
}
