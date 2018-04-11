import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { E_TipoIndividuo2 } from 'app/Models/E_TipoIndividuo2';
import { E_Individuo2 } from 'app/Models/E_Individuo2';
import { GenerateMask } from 'app/Tools/MaskedLibrary';
import { NavigationInfoService } from 'app/ApiServices/NavigationInfoService';
import { MatDialog } from '@angular/material';
import { PhotoTool } from 'app/Tools/PhotoTool';
import { E_Reunion } from 'app/Models/E_Reunion';
import { E_Imagen } from 'app/Models/E_Imagen';
import { AdminServices } from 'app/ApiServices/AdminServices';
import { Router } from '@angular/router';
import { UserService } from '../../../../ApiServices/UserService';
import { E_Departamentos } from '../../../../Models/E_Departamentos';
import { E_Municipios } from 'app/Models/E_Municipios';
import { E_Cliente } from 'app/Models/E_Cliente';
import { E_Sector } from '../../../../Models/E_Sector';
import { E_ZonaElectoral } from '../../../../Models/E_ZonaElectoral';
import { E_PuestoVotacion } from 'app/Models/E_PuestoVotacion';
import { E_Mesa } from '../../../../Models/E_Mesa';
import { E_ConfiguracionTipoIndividuo } from '../../../../Models/E_ConfiguracionTipoIndividuo';
import { E_DetalleIndividuo } from 'app/Models/E_DetalleIndividuo';

@Component({
    moduleId: module.id,
    selector: 'individuo-2',
    templateUrl: 'individuo-2.component.html',
    styleUrls: ['individuo-2.component.scss']
})
export class Individuo2Component implements OnInit {
    DepartamentoConfig: boolean
    MunicipioConfig: boolean
    ZonaElectoralConfig: boolean
    PuestoVotacionConfig: boolean
    MesaConfig: boolean
    showMesa: boolean;
    showPuestoVotacion: boolean;
    showZonaElectoral: boolean;
    showMunicipio: boolean;
    showDepartamento: boolean;
    public Detalleindividuo: Array<E_DetalleIndividuo>
    ListMunicipiosGroup: E_Municipios[];
    ListConfiguration: E_ConfiguracionTipoIndividuo[];
    ListMesas: E_Mesa[];
    formErrorsDynamic: any
    ListPuestoVotacionGroup: E_PuestoVotacion[];
    ListZonaElectoralGroup: E_ZonaElectoral[];
    ListSector: E_Sector[];
    formDinamic: FormGroup;
    ListMunicipiosBase: E_Municipios[];
    ListDepartamentos: E_Departamentos[];
    SucceSave: boolean;
    dataURL: any;
    public MaskedNumber: any[]
    MaskedNumberNoDecimal: any[]
    form: FormGroup;
    formErrors: any;
    noFoto: boolean = true
    TipoIndividuo2Seleccionado: any
    ListTipoIndividuo2: Array<E_TipoIndividuo2> = new Array<E_TipoIndividuo2>()
    public Nombre: string;
    public descripcion: string;
    public checked;
    // Horizontal Stepper
    constructor(private formBuilder: FormBuilder,
        private ParameterService: ParameterService,
        private NavigationData: NavigationInfoService,
        private dialog: MatDialog,
        private AdminServices: AdminServices,
        private Router: Router,
        private UserService: UserService
    ) { }


    ngOnInit() {
        this.chargeAllforms()
        this.ChargeAllParameters()
    }
    ReturnPage(event: Event) {
        event.preventDefault();
        this.Router.navigate(['/mainpageindividuo1'])
    }

    EnviarInfo() {
        var objIndividuo2: E_Individuo2 = new E_Individuo2()
        objIndividuo2.Cedula = this.form.value.Cedula
        objIndividuo2.Nombre = this.form.value.Nombre
        objIndividuo2.Apellido = this.form.value.Apellido
        objIndividuo2.Direccion = this.form.value.Direccion
        objIndividuo2.Correo = this.form.value.Correo
        objIndividuo2.Telefono = this.form.value.Telefono
        objIndividuo2.Celular = this.form.value.Celular
        objIndividuo2.Estado = true
        objIndividuo2.FechaCreacion = new Date();
        objIndividuo2.Id_Individuo1 = this.UserService.GetCurrentCurrentUserNow().Id
        objIndividuo2.Id_TipoEstadoRevision = 1 //Pendiente revision por SAC
        objIndividuo2.Id_TipoIndividuo2 = this.form.value.TipoIndividuo2
        objIndividuo2.CambiarClave = true

        //   this.AdminServices.crearIndividuo2(objIndividuo2).subscribe((x: boolean) => { this.SucceSave = x })

    }

    SelectedDepartamento(y) {
        this.ListMunicipiosGroup = this.ListMunicipiosBase.filter(x => x.Id_Departamento == Number(y.value.Codigo))
    }

    SelectedMunicipio(y) {
        var objzona: E_ZonaElectoral = new E_ZonaElectoral()
        objzona.Id_Municipio = y.value
        this.ParameterService.listarZonasxMunicipio(objzona)
            .subscribe((x: Array<E_ZonaElectoral>) => {
                this.ListZonaElectoralGroup = x
            })

    }
    SelectedZonaElectoral(y) {
        var objPuesto: E_PuestoVotacion = new E_PuestoVotacion()
        objPuesto.Id_ZonaElectoral = y.value
        this.ParameterService.listarPuestosVotacionxZona(objPuesto).subscribe((x: Array<E_PuestoVotacion>) => {
            this.ListPuestoVotacionGroup = x
        })
    }

    SelectedPuestoVotacion(y) {
        var objPuesto: E_Mesa = new E_Mesa()
        objPuesto.Id_puestoVotacion = y.value
        this.ParameterService.listarMesasxPuesto(objPuesto).subscribe((x: Array<E_Mesa>) => {

            this.ListMesas = x
        })

    }

    AgregarItem(x: number) {
        alert(x)
        var objDetalle: E_DetalleIndividuo = new E_DetalleIndividuo()
        switch (x) {
            case 2:
                objDetalle.Id_Municipio = this.formDinamic.value.Municipio
                break;
            case 3:
                objDetalle.Id_ZonaElectoral = this.formDinamic.value.ZonaElectoral
                break;
            case 4:
                objDetalle.Id_PuestoVotacion = this.formDinamic.value.PuestoVotacion
                break;
            case 5:
                objDetalle.Id_Mesa = this.formDinamic.value.Mesa.Id
                break;
            default:
                break;
        }

        this.Detalleindividuo.push(objDetalle)
        console.log(this.Detalleindividuo)
    }
    onFormValuesChanged() {

        for (const field in this.formErrors) {
            if (!this.formErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.formErrors[field] = {};

            // Get the control
            const control = this.form.get(field);

            if (control && control.dirty && !control.valid) {
                this.formErrors[field] = control.errors;
            }
        }
    }

    onFormValuesChangedDinamyc() {

        for (const field in this.formErrorsDynamic) {
            if (!this.formErrorsDynamic.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.formErrorsDynamic[field] = {};

            // Get the control
            const control = this.formDinamic.get(field);

            if (control && control.dirty && !control.valid) {
                this.formErrorsDynamic[field] = control.errors;
            }
        }
    }

    CargarPerfil(VarTipo: any) {


        var GroupConfig = this.ListConfiguration.filter((x) => x.Id_tipoindividuo2 == VarTipo.value.Id)
        if (GroupConfig.length > 0) {
            var flagActual = false
            var flagAnterior = false
            var valorVisibilidad = false
            this.showDepartamento = true
            this.DepartamentoConfig = false // por validar
            var TotalFalso = false
            GroupConfig.forEach(element => {
                
                flagActual = element.Activo
                valorVisibilidad = true
                if (flagAnterior == true && flagActual == false) {
                    valorVisibilidad = false
                    TotalFalso = true
                }
                flagAnterior = element.Activo
                if (TotalFalso == true) { valorVisibilidad = false }
                switch (element.NombreEstructura) {
                    case "Departamento":
                        this.DepartamentoConfig = flagActual
                        break;
                    case "Municipio":
                        this.showMunicipio = valorVisibilidad
                        this.MunicipioConfig = flagActual
                        break;
                    case "Zonas Electorales":
                        this.showZonaElectoral = valorVisibilidad
                        this.ZonaElectoralConfig = flagActual
                        break;
                    case "Puesto Votacion":
                        this.showPuestoVotacion = valorVisibilidad
                        this.PuestoVotacionConfig = flagActual
                        break;
                    case "Mesa":
                        this.showMesa = valorVisibilidad
                        this.MesaConfig = flagActual
                        break;
                    default:
                        break;
                }



                //  element.NombreEstructura == "Departamento"

            });
        }





    }

    ChargeAllParameters() {
        this.MaskedNumber = GenerateMask.numberMask
        this.MaskedNumberNoDecimal = GenerateMask.Nodecimal
        this.ParameterService.listarTipoIndividuo2()
            .subscribe((x: Array<E_TipoIndividuo2>) => {
                var objPerf = this.UserService.GetCurrentCurrentUserNow().Id_Perfil
                switch (objPerf) {
                    case 4: var objSelection = 1
                        break;
                    case 5: var objSelection = 2
                        break;
                    case 6: var objSelection = 3
                        break;
                    default:
                        break;
                }
                this.ListTipoIndividuo2 = x.filter((y) => y.Id_tipoindividuo1 == objSelection)
            })

        this.form.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });
        this.formDinamic.valueChanges.subscribe(() => {
            this.onFormValuesChangedDinamyc();
        });

        var IdClienteDirector = this.UserService.GetCurrentCurrentUserNow().Id_Cliente
        var ObjClientDirector = new E_Cliente()
        ObjClientDirector.Id = IdClienteDirector
        this.UserService.ClientexId(ObjClientDirector)
            .subscribe((x: E_Cliente) => {
                var ObjSector: E_Sector = new E_Sector()
                ObjSector.Id_Departamento = x.Id_Departamento
                this.ParameterService.ListarSector(ObjSector).subscribe((x) => {
                    this.ListSector = x
                })
                /*    this.ParameterService.listarDepartamentos()
                        .subscribe((y: Array<E_Departamentos>) => {
                            var codigoDepto = y.find((z) => z.Id == x.Id_Departamento).Codigo
                            this.ParameterService.ListarMunicipios()
                                .subscribe((w: Array<E_Municipios>) => {
                                   this.ListMunicipiosBase = w.filter((w1) => w1.Id_Departamento == Number(codigoDepto))
                                })
                        })*/
            })

        this.ParameterService.ListarConfTipoIndividuo()
            .subscribe((x: Array<E_ConfiguracionTipoIndividuo>) => {
                this.ListConfiguration = x
            })

        this.ParameterService.listarDepartamentos()
            .subscribe((x: Array<E_Departamentos>) => {
                this.ListDepartamentos = x
            })
        this.ParameterService.ListarMunicipios()
            .subscribe((x: Array<E_Municipios>) => {
                this.ListMunicipiosBase = x
            })

    }

    chargeAllforms() {
        this.formErrors = {
            email: {},
            Cedula: {},
            Telefonof: {},
            Nombre: {},
            Apellido: {},
            Celular: {},
            TipoIndividuo2: {},
            Direccion: {}
        };

        this.formErrorsDynamic = {
            Departamento: {},
            Municipio: {},
            Nombre: {},
            Sector: {},
            ZonaElectoral: {},
            PuestoVotacion: {},
            Mesa: {}
        };

        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            Cedula: ['', [Validators.required]],
            Telefonof: [''],
            Celular: ['', [Validators.required]],
            Nombre: ['', [Validators.required]],
            Apellido: ['', [Validators.required]],
            Direccion: ['', [Validators.required]],
            TipoIndividuo2: [undefined, [Validators.required]]

        });
        var options = [Validators.required]
        var options1 = []
        this.formDinamic = this.formBuilder.group({
            Municipio: [undefined, options],
            ZonaElectoral: [undefined, options],
            PuestoVotacion: [undefined, options],
            Departamento: [undefined, options],
            Mesa: [undefined, options],
        });
    }
}

