import { Component, AfterViewChecked, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Router } from '@angular/router';

import { NavigationInfoService } from 'app/ApiServices/NavigationInfoService';

@Component({
    selector: 'DetailDialog',
    templateUrl: './DetailDialog.component.html',
    styleUrls: ['./DetailDialog.component.scss']
})
export class DetailDialogComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DetailDialogComponent>,
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