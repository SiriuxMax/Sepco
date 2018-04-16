// Angular Imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { TextMaskModule } from 'angular2-text-mask';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatCheckboxModule } from '@angular/material/checkbox';

// This Module's Components
import { ListarMetasComponent } from './listar-metas.component';

const routes: Routes = [
    {
        path: 'ListarMetasdetalle',
        component: ListarMetasComponent
    }
];


@NgModule({
    declarations: [
        ListarMetasComponent
        
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
        NgxDatatableModule,
        MatCheckboxModule

    ],//, entryComponents: [AceptImageComponent,OkImageComponent]
    exports: [
        ListarMetasComponent,
    ]
})
export class ListarMetasModule {

}
