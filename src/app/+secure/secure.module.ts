// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// libs
// TODO: ngx-i18n-router
// import { I18NRouterModule } from '@ngx-i18n-router/core';

// framework
import { SharedModule } from '~/app/framework/core/shared.module';
import { MaterialModule } from '~/app/framework/material/material.module';

// module
import { SecureComponent } from './secure.component';
import { routes } from './secure.routes';

@NgModule({
  imports: [
    CommonModule,
    // TODO: ngx-i18n-router
    // I18NRouterModule.forChild(routes, 'home')
    RouterModule.forChild(routes),
    MaterialModule,
    SharedModule
  ],
  declarations: [SecureComponent]
})
export class SecureModule {
}
