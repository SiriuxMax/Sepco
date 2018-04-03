import { Component, AfterViewChecked, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NavigationInfoService } from '../../../../ApiServices/NavigationInfoService';
import { Router } from '@angular/router';
import { PhotoTool } from '../../../../Tools/PhotoTool';

@Component({
    selector: 'fotoDialog',
    templateUrl: './fotoDialog.component.html',
    styleUrls: ['./fotoDialog.component.scss']
})
export class fotoDialogComponent implements OnInit {
    camera: number = 1
    CapturedPhoto: boolean;
    dataURL: any;
    constructor(
        public dialogRef: MatDialogRef<fotoDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, private NavigationInfoService: NavigationInfoService
        , private Router: Router) { }
    ngOnInit(): void {
        console.log(this.data)

        PhotoTool.plauvideo()

    }
    onNoClick(): void {
        this.dialogRef.close();
    }

    changeCamera() {
        this.camera = this.camera == 1 ? this.camera = 2 : this.camera = 1
        PhotoTool.plauvideoWithCameraSelection(this.camera)
    }


    CreateEvent() {
        this.NavigationInfoService.storage = this.data


        this.dialogRef.close();
    }
    RegisterPhoto() {
        
        var canvas: any = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        var video: any = document.getElementById('video');
        var cw = Math.floor(canvas.clientWidth / 100);
        var ch = Math.floor(canvas.clientHeight / 100);
  
    
      //  context.drawImage(video, 0, 0, cw, ch);
       
        context.drawImage(video, 0, 0, 640, 480);
        this.dataURL = canvas.toDataURL('image/jpeg', 0.5);
        this.CapturedPhoto = true
    }
    CancelFoto() {
        this.CapturedPhoto = false
    }
    EnviarFoto() {
        this.dialogRef.close(this.dataURL);
    }


}