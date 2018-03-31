import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { UserService } from '../../../ApiServices/UserService';
import { E_Usuario } from '../../../Models/E_Usuario';
import { PhotoTool } from '../../../Tools/PhotoTool';


@Component({
    selector: 'fuse-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: fuseAnimations
})
export class FuseLoginComponent implements OnInit {
    Loading: boolean;
    errorLogin: boolean;
    @ViewChild("jojo") jojo: ElementRef
    loginForm: FormGroup;
    loginFormErrors: any;

    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private Router: Router, private UserService: UserService
    ) {
        this.fuseConfig.setConfig({
            layout: {
                navigation: 'none',
                toolbar: 'none',
                footer: 'none'
            }
        });

        this.loginFormErrors = {
            email: {},
            password: {}
        };
    }

    ngOnInit() {
        this.UserService.ClearCurrentCurrentUserNow()
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        this.loginForm.valueChanges.subscribe(() => {
            this.onLoginFormValuesChanged();
        });

    }

    onLoginFormValuesChanged() {
        for (const field in this.loginFormErrors) {
            if (!this.loginFormErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.loginFormErrors[field] = {};

            // Get the control
            const control = this.loginForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.loginFormErrors[field] = control.errors;
            }
        }
    }
    loginNow() {
        var user: E_Usuario = new E_Usuario();
        user.UserName = this.loginForm.value.email
        user.Passwordd = btoa(this.loginForm.value.password)
        this.Loading = true
        this.UserService.Login(user).subscribe((x: E_Usuario) => {
            if (x.error != undefined) {
                if (x.error.Id == 1) {
                    this.errorLogin = true
                    this.Loading = false
                    return
                }
            }
            this.Loading = false
            this.Router.navigate(["/sample/"])
        })
        //   ;
    }
}
