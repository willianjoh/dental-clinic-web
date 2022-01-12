import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsultaCepService } from './services/consulta-cep.service';
import { DropdownService } from './services/dropdown.service';
import { MaterialModule } from './shared/material/material.module';
import { HomeComponent } from './template/home/home.component';
import { TemplateModule } from './template/template.module';
import { PacienteModule } from './views/paciente/paciente.module';



export const DateFormat = {
  parse: {
    dateInput: 'input',
  },
  display: {
    dateInput: 'MM/DD/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'MM/DD/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PacienteModule,
    TemplateModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],

  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    ConsultaCepService,
    DropdownService
  ],

  bootstrap: [AppComponent]
})
export class AppModule {

}
