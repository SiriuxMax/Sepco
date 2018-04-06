import { Component, AfterViewChecked, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NavigationInfoService } from 'app/ApiServices/NavigationInfoService';
import { Router } from '@angular/router';
import { PhotoTool } from 'app/Tools/PhotoTool';

@Component({
    selector: 'OkImage',
    templateUrl: './OkImage.component.html',
    styleUrls: ['./OkImage.component.scss']
})
export class OkImageComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<OkImageComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, private NavigationInfoService: NavigationInfoService
        , private Router: Router) { }
    ngOnInit(): void {


    }
    onNoClick(): void {

    }


    GotoDetailsNow() {
        this.Router.navigate(["/detailevent"])
        
        this.NavigationInfoService.dataEvento = this.data.selected[0]
        this.dialogRef.close(true);
    }


}