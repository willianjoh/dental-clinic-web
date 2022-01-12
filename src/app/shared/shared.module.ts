import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BreadcrumbComponent } from '../componentes/breadcrumb/breadcrumb.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { TabsModule } from 'ngx-bootstrap/tabs';
import './../config/ngx-bootstrap.config';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    BreadcrumbComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxMaskModule.forRoot(maskConfig),
  ],
  exports: [
    CommonModule,
    BsDatepickerModule,
    TabsModule,
    NgxMaskModule,
  ]
})
export class SharedModule {
  constructor(
    private bsLocaleService: BsLocaleService
  ) {
    this.bsLocaleService.use('pt-br');
  }
}
