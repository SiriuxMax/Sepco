import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';



@Component({
    moduleId: module.id,
    selector: 'Dialog',
    templateUrl: 'Dialog.component.html',
    styleUrls: ['Dialog.component.scss']
})
export class DialogComponent implements OnInit {
    ngOnInit(): void {

    }
    PasswordTemp: string;


    constructor(public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

}

