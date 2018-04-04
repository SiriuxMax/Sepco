import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { fuseConfig } from './fuse-config';

import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { FuseSampleModule } from './main/content/sample/sample.module';
import { LoginModule } from './main/content/login/login.module';
import { RegisterModule } from './main/content/register/register.module';
import { UserService } from './ApiServices/UserService';
import { ParameterService } from './ApiServices/ParametersServices';
import { ImageService } from './ApiServices/ImageServices';
import { HeaderBuilder } from './Tools/HeaderBuilder';
import { MapsGraphicModule } from './main/content/Mapas/MapsGraphic.module';
import { EventCreatorModule } from './main/content/CreadorEventos/EventCreator.module';
import { NavigationInfoService } from './ApiServices/NavigationInfoService';
import { VisorEventModule } from './main/content/VisorEventos/VisorEvent.module';
import { ReunionService } from './ApiServices/ReunionService';
import { DetailEventModule } from './main/content/DetailEvent/DetailEvent.module';
import { TipoEventoModule } from './main/content/TipoEvento/tipo-evento.module';
import { AdminServices } from './ApiServices/AdminServices';
import { AceptImageModule } from './main/content/AceptarImagenes/AceptImage.module';


const appRoutes: Routes = [
    { path: 'sample', redirectTo: '/sample', pathMatch: 'full' },
    { path: 'register', redirectTo: '/register' },
    { path: 'Maps', redirectTo: '/Maps', pathMatch: 'full' },
    { path: 'eventcreator', redirectTo: '/eventcreator', pathMatch: 'full' },
    { path: 'eventvisor', redirectTo: '/eventvisor', pathMatch: 'full' },
    { path: 'tipoevento', redirectTo: '/tipoevento', pathMatch: 'full' },
    { path: 'detailevent', redirectTo: '/detailevent', pathMatch: 'full' },
    { path: 'aceptimage', redirectTo: '/aceptimage', pathMatch: 'full' },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' },


];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        TranslateModule.forRoot(),

        // Fuse Main and Shared modules
        FuseModule.forRoot(fuseConfig),
        FuseSharedModule,
        FuseMainModule,
        FuseSampleModule,
        LoginModule,
        RegisterModule,
        MapsGraphicModule,
        EventCreatorModule,
        VisorEventModule,
        DetailEventModule,
        TipoEventoModule,
        AceptImageModule
    ],
    providers: [
        UserService
        , ParameterService
        , ImageService
        , HeaderBuilder
        , NavigationInfoService
        , ReunionService
        , AdminServices],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
