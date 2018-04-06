import { Component, AfterViewChecked, OnInit } from '@angular/core';
import { MapFields, FieldObj } from './Mapfields';
import { MatDialog } from '@angular/material';
import { MapDialogComponent } from '../Map-Dialog-Options/Map-Dialog-Options.component';
import { ParameterService } from 'app/ApiServices/ParametersServices';
import { E_Departamentos } from 'app/Models/E_Departamentos';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

@Component({
    selector: 'Map-content',
    templateUrl: './Map-content.component.html',
    styleUrls: ['./Map-content.component.scss']
})
export class MapContentComponent implements OnInit {
    public filteredStates2$: Observable<Array<E_Departamentos[]>>;
    stateCtrl: FormControl = new FormControl();

    ListDepartamentos: E_Departamentos[];
    Fields: Array<FieldObj> = MapFields.Fields()
    constructor(public dialog: MatDialog,
        private ParameterService: ParameterService) {
        this.ParameterService.listarDepartamentos()
            .subscribe((x: Array<E_Departamentos>) => {

                this.ListDepartamentos = x
            })
        this.filteredStates2$ = this.stateCtrl.valueChanges.pipe(
            startWith(''),
            map(name => this.filterStatesComplex(name))
        )
    }

    displayFn(user?: E_Departamentos): string | undefined {
        return user ? user.Nombre : undefined;
    }

    SeleccionarDepto(Y) {
        console.log(Y.option.value)
        var idfiels = this.Fields.find(x => x.idBd == Y.option.value.Codigo).id
        this.DepartamentoSeleccionado(idfiels, true)
        //  var obj = document.getElementById(idfiels)
        //  console.log(obj)
    }

    filterStatesComplex(val: any): any[] {

        var TextX = typeof val == "object" ? val.Nombre : val

        return val ?
            this.ListDepartamentos.filter(s => s.Nombre.toLowerCase().indexOf(TextX.toLowerCase()) === 0)
            : this.ListDepartamentos;

    }


    ngOnInit(): void {

    }
    handleMouseMove(event) {

        var countryId = event.target.id;
        var tooltip = document.getElementById("tooltip");
        var tooltip1 = document.getElementById("tooltip1");
        var TextX = '';
        var NUmero = ""
        if (!(this.Fields.some(x => x.id == countryId))) {
            tooltip.classList.remove("active");
            tooltip1.classList.remove("active");
            return
        }

        TextX = this.Fields.find(x => x.id == countryId).Nombre
        NUmero = this.Fields.find(x => x.id == countryId).NumeroReuniones.toString()
        var x = event.clientX;
        var y = event.clientY;

        tooltip.style.left = (x + 20) + "px";
        tooltip.style.top = (y - 20) + "px";
        tooltip.innerHTML = TextX;
        tooltip.classList.add("active");
        tooltip1.style.left = (x + 20) + "px";
        tooltip1.style.top = (y) + "px";
        tooltip1.innerHTML = " Numero de Eventos " + NUmero;
        tooltip1.classList.add("active");

    }

    DepartamentoSeleccionado(x: any, Internal: boolean = false) {

        var y = Internal ? x : x.currentTarget.id
        var TextX = this.Fields.find(x => x.id == y).Nombre
        var NUmero = this.Fields.find(x => x.id == y).NumeroReuniones.toString()
        var CodigoDepto = this.Fields.find(x => x.id == y).idBd
        var IdDepto = this.ListDepartamentos.find(x => x.Codigo == CodigoDepto.toString()).Id
        var data = { NumeroEventos: NUmero, Nombre: TextX, CodigoDepto: CodigoDepto, IdDepto: IdDepto }

        this.openDialog(data)
    }
    openDialog(data: any) {
        // 
        const dialogRef = this.dialog.open(MapDialogComponent, {
            height: '350px',
            data: data
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }
}
