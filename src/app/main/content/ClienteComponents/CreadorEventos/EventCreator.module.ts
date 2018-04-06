import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { EventCreatorComponent } from './EventCreator.component';
import { TextMaskModule } from 'angular2-text-mask';
import { fotoDialogComponent } from './fotoDialog/fotoDialog.component';

const routes: Routes = [
    {
        path: 'eventcreator',
        component: EventCreatorComponent
    }
];

@NgModule({
    declarations: [
        EventCreatorComponent,
        fotoDialogComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        MatDialogModule,
        FuseSharedModule,
        TextMaskModule,
    ], entryComponents: [fotoDialogComponent]

})
export class EventCreatorModule {
}
