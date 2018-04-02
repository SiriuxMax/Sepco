import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSpinner, MatProgressSpinnerModule, MatIconModule, MatListModule, MatDividerModule, MatDialogModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { MapsGraphicComponent } from './MapsGraphic.component';
import { FuseDemoModule } from '@fuse/components';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MapContentComponent } from './Map-content/Map-content.component';
import { MapSidenavComponent } from './Map-sidenav/Map-sidenav.component';
import { MapDialogComponent } from './Map-Dialog-Options/Map-Dialog-Options.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
const routes = [
    {
        path: 'Maps',
        component: MapsGraphicComponent
    }
];

@NgModule({
    declarations: [
        MapsGraphicComponent,
        MapContentComponent,
        MapSidenavComponent,
        MapDialogComponent

    ],
    imports: [
        RouterModule.forChild(routes),
        MatDividerModule,
        MatListModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        FuseSharedModule,
        MatIconModule,
        MatSidenavModule,
        MatDialogModule,
        MatAutocompleteModule

    ]
    , entryComponents: [MapDialogComponent]
})
export class MapsGraphicModule {
}
