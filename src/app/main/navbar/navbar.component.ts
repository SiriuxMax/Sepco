import { Component, Input, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { navigation, navigationAdmin } from 'app/navigation/navigation';
import { navigationClient } from 'app/navigation/navigation';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { AppSettings } from '../../app.settings';
import { UserService } from 'app/ApiServices/UserService';

@Component({
    selector: 'fuse-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FuseNavbarComponent implements OnDestroy {
    private fusePerfectScrollbar: FusePerfectScrollbarDirective;

    @ViewChild(FusePerfectScrollbarDirective) set directive(theDirective: FusePerfectScrollbarDirective) {
        if (!theDirective) {
            return;
        }

        this.fusePerfectScrollbar = theDirective;

        this.navigationServiceWatcher =
            this.navigationService.onItemCollapseToggled.subscribe(() => {
                this.fusePerfectScrollbarUpdateTimeout = setTimeout(() => {
                    this.fusePerfectScrollbar.update();
                }, 310);
            });
    }

    @Input() layout;
    navigation: any;
    navigationServiceWatcher: Subscription;
    fusePerfectScrollbarUpdateTimeout;

    constructor(
        private sidebarService: FuseSidebarService,
        private navigationService: FuseNavigationService,
        private userService: UserService
    ) {
        // Navigation data
        //   if (AppSettings.Global().TipoAplicacion == 1) 
        if (this.userService.GetCurrentCurrentUserNow() == null) {
            this.navigation = navigation;
        }
        else {
            if (this.userService.GetCurrentCurrentUserNow().Id_Perfil == 1) {
                this.navigation = navigationClient;
            } else if (this.userService.GetCurrentCurrentUserNow().Id_Perfil == 2) {
                this.navigation = navigationAdmin;
            }
        }



        // Default layout
        this.layout = 'vertical';
    }

    ngOnDestroy() {
        if (this.fusePerfectScrollbarUpdateTimeout) {
            clearTimeout(this.fusePerfectScrollbarUpdateTimeout);
        }

        if (this.navigationServiceWatcher) {
            this.navigationServiceWatcher.unsubscribe();
        }
    }

    toggleSidebarOpened(key) {
        this.sidebarService.getSidebar(key).toggleOpen();
    }

    toggleSidebarFolded(key) {
        this.sidebarService.getSidebar(key).toggleFold();
    }
}
