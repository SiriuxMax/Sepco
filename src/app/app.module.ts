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
import { FuseSampleModule } from './main/content/AutenticationComponents/sample/sample.module';
import { LoginModule } from './main/content/AutenticationComponents/login/login.module';
import { RegisterModule } from './main/content/AutenticationComponents/register/register.module';
import { UserService } from './ApiServices/UserService';
import { ParameterService } from './ApiServices/ParametersServices';
import { ImageService } from './ApiServices/ImageServices';
import { HeaderBuilder } from './Tools/HeaderBuilder';
import { MapsGraphicModule } from './main/content/ClienteComponents/Mapas/MapsGraphic.module';
import { EventCreatorModule } from './main/content/ClienteComponents/CreadorEventos/EventCreator.module';
import { NavigationInfoService } from './ApiServices/NavigationInfoService';
import { VisorEventModule } from './main/content/ClienteComponents/VisorEventos/VisorEvent.module';
import { ReunionService } from './ApiServices/ReunionService';
import { DetailEventModule } from './main/content/ClienteComponents/DetailEvent/DetailEvent.module';
import { TipoEventoModule } from './main/content/AdminComponents/TipoEvento/tipo-evento.module';
import { AdminServices } from './ApiServices/AdminServices';
import { AceptImageModule } from './main/content/AdminComponents/AceptarImagenes/AceptImage.module';
import { MainPageAdminModule } from './main/content/AdminComponents/MainPageAdmin/MainPageAdmin.module'
import { ParamSectoresModule } from './main/content/AdminComponents/ParamSectores/ParamSectores.module';
import { UserInfoModule } from 'app/main/content/AutenticationComponents/UserInfo/UserInfo.module';
import { DirectorDepartamentoModule } from './main/content/AdminComponents/DirectorDepartamento/director-departamento.module';
import { SectorModule } from './main/content/AdminComponents/Sector/sector.module';

const appRoutes: Routes = [
    { path: 'sample', redirectTo: '/sample', pathMatch: 'full' },
    { path: 'register', redirectTo: '/register' },
    { path: 'Maps', redirectTo: '/Maps', pathMatch: 'full' },
    { path: 'eventcreator', redirectTo: '/eventcreator', pathMatch: 'full' },
    { path: 'eventvisor', redirectTo: '/eventvisor', pathMatch: 'full' },
    { path: 'tipoevento', redirectTo: '/tipoevento', pathMatch: 'full' },
    { path: 'detailevent', redirectTo: '/detailevent', pathMatch: 'full' },
    { path: 'aceptimage', redirectTo: '/aceptimage', pathMatch: 'full' },
    { path: 'mainpageadmin', redirectTo: '/mainpageadmin', pathMatch: 'full' },  
    { path: 'sector', redirectTo: '/sector', pathMatch: 'full' },

    { path: 'directordepartamento', redirectTo: '/directordepartamento', pathMatch: 'full' },
          
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
        AceptImageModule,
        SectorModule,
        MainPageAdminModule,
        UserInfoModule,
        DirectorDepartamentoModule
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
