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
import { SectorModule } from './main/content/AdminComponents/Sector/sector.module';
import { ListarMetasModule } from './main/content/listar-metasDir/listar-metas.module';
import { ListarMetasGerModule } from './main/content/listar-metas-ger/listar-metas-ger.module';
import { SacIndividuo2Module } from './main/content/AdminComponents/sac-individuo2/sac-individuo2.module';
import { AdminIndividuo2Module } from './main/content/AdminComponents/sac-individuo2/admin-individuo2/admin-individuo2.module';

import { ZonaElectoralModule } from './main/content/AdminComponents/ZonaElectoral/zona-electoral.module';
import { Individuo1Module } from 'app/main/content/DirectorDepartamentosComponents/Individuo1/individuo-1.module';
import { MainPageDirectorModule } from './main/content/DirectorDepartamentosComponents/MainPageDirector/MainPageDirector.module';
import { MainPageIndividuo1Module } from './main/content/Individuo1Components/MainPageIndividuo1/MainPageIndividuo1.module';
import { Individuo2Module } from './main/content/Individuo1Components/Individuo2/individuo-2.module';
import { CambiarClaveModule } from './main/content/AutenticationComponents/cambiar-clave/cambiar-clave.module';
import { MesaModule } from './main/content/AdminComponents/Mesa/mesa.module';
import { GerenteSectorModule } from './main/content/AdminComponents/GerenteSector/gerente-sector.module';
import { PuestoVotacionModule } from 'app/main/content/AdminComponents/PuestoVotacion/puesto-votacion.module';
import { DirectorDepartamentoModule } from 'app/main/content/GerenteSectorComponents/DirectorDepartamento/director-departamento.module';
import { MainGerenteModule } from './main/content/GerenteSectorComponents/MainGerente/MainGerente.module';
import { IndividuoServices } from 'app/ApiServices/IndividuoServices';
import { TotalesModule } from 'app/main/content/ClienteComponents/totales/totales.module';
import { CorreoModule } from 'app/main/content/AdminComponents/correo/correo.module';
import { ListarVehiculosxDirModule } from './main/content/listar-vehiculosx-dir/listar-vehiculosx-dir.module';
import { CarrouselModule } from './main/content/ClienteComponents/Mapas/Carrousel/Carrousel.module';
import { Error404Module } from './main/content/AutenticationComponents/404/error-404.module';
import { ClientGuard } from 'app/Guards/ClientGuard';
import { AdminGuard } from 'app/Guards/AdminGuard';


const appRoutes: Routes = [
    //Autenticacion
    { path: 'sample', redirectTo: '/sample', pathMatch: 'full' },
    { path: 'register', redirectTo: '/register' },
    { path: 'cambiarClave', redirectTo: '/cambiarClave' },
    { path: 'error-404', redirectTo: '/error-404' },
    //Cliente
    { path: 'Maps', redirectTo: '/Maps', pathMatch: 'full' },
    { path: 'eventcreator', redirectTo: '/eventcreator', pathMatch: 'full' },
    { path: 'eventvisor', redirectTo: '/eventvisor', pathMatch: 'full' },
    { path: 'tipoevento', redirectTo: '/tipoevento', pathMatch: 'full' },
    { path: 'detailevent', redirectTo: '/detailevent', pathMatch: 'full' },
    { path: 'aceptimage', redirectTo: '/aceptimage', pathMatch: 'full' },
    { path: 'totales', redirectTo: '/totales', pathMatch: 'full' },
    { path: 'ListarMetas', redirectTo: '/ListarMetas', pathMatch: 'full' },
    { path: 'Carrousel', redirectTo: '/Carrousel', pathMatch: 'full' },
    { path: 'correo', redirectTo: '/correo', pathMatch: 'full' },
    //Admin
    { path: 'mainpageadmin', redirectTo: '/mainpageadmin', pathMatch: 'full' },
    { path: 'sector', redirectTo: '/sector', pathMatch: 'full' },
    { path: 'SacIndividuo2', redirectTo: '/SacIndividuo2', pathMatch: 'full' },
    { path: 'AdminIndividuo2', redirectTo: '/AdminIndividuo2', pathMatch: 'full' },
    { path: 'zonaelectoral', redirectTo: '/zonaelectoral', pathMatch: 'full' },
    { path: 'puestovotacion', redirectTo: '/puestovotacion', pathMatch: 'full' },
    { path: 'mesa', redirectTo: '/mesa', pathMatch: 'full' },
    { path: 'gerentesector', redirectTo: '/gerentesector', pathMatch: 'full' },
    { path: 'ListarVehiculosxDir', redirectTo: '/ListarVehiculosxDir', pathMatch: 'full' },
    //Gerente
    { path: 'maingerente', redirectTo: '/maingerente', pathMatch: 'full' },
    { path: 'directordepartamento', redirectTo: '/directordepartamento', pathMatch: 'full' },
    //Director
    { path: 'mainpagedirector', redirectTo: '/mainpagedirector', pathMatch: 'full' },
    { path: 'individuo1', redirectTo: '/individuo1', pathMatch: 'full' },
    //Individuo 1
    { path: 'mainpageindividuo1', redirectTo: '/mainpageindividuo1', pathMatch: 'full' },
    { path: 'individuo2', redirectTo: '/individuo2', pathMatch: 'full' },

    { path: 'ListarMetasGer', redirectTo: '/ListarMetasGer', pathMatch: 'full' },

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
        DirectorDepartamentoModule,
        Individuo2Module,
        ZonaElectoralModule,
        Individuo1Module,
        MainPageDirectorModule,
        MainPageIndividuo1Module,
        CambiarClaveModule,
        PuestoVotacionModule,
        MesaModule,
        GerenteSectorModule,
        SacIndividuo2Module,
        AdminIndividuo2Module,
        TotalesModule,
        MainGerenteModule,
        ListarMetasModule,
        ListarMetasGerModule,
        ListarVehiculosxDirModule,
        CarrouselModule,
        CorreoModule,
        Error404Module,
    ],
    providers: [
        UserService
        , ParameterService
        , ImageService
        , HeaderBuilder
        , NavigationInfoService
        , ReunionService
        , AdminServices
        , IndividuoServices
        , ClientGuard
        , AdminGuard]
    ,
    bootstrap: [
        AppComponent
    ], entryComponents: [

    ]

})
export class AppModule {
}
