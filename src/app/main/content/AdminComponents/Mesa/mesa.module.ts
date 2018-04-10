// Angular Imports
import { NgModule } from '@angular/core';
import { MesaComponent } from './mesa.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatFormFieldModule,MatCheckboxModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { TextMaskModule } from 'angular2-text-mask';


const routes: Routes = [
    {
        path: 'mesa',
        component: MesaComponent
    }
];

@NgModule({
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
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatProgressSpinnerModule
    ],
    declarations: [
        MesaComponent,
    ],
    exports: [
        MesaComponent,
    ]
})
export class MesaModule {

}
