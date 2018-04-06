import { Component, AfterViewChecked, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NavigationInfoService } from 'app/ApiServices/NavigationInfoService';
import { Router } from '@angular/router';

@Component({
    selector: 'Map-dialog',
    templateUrl: './Map-Dialog-Options.component.html',
    styleUrls: ['./Map-Dialog-Options.component.scss']
})
export class MapDialogComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<MapDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, private NavigationInfoService: NavigationInfoService
        , private Router: Router) { }
    ngOnInit(): void {
    
    }
    onNoClick(): void {
        this.dialogRef.close();
    }
    CreateEvent() {
        this.NavigationInfoService.storage = this.data
        this.dialogRef.close();
        this.Router.navigate(["/eventcreator"])
    }
    VisorEvent() {
        this.NavigationInfoService.storage = this.data
        this.dialogRef.close();
        this.Router.navigate(["/eventvisor"])
    }

}