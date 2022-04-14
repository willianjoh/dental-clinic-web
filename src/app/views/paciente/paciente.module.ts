import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PacienteComponent } from './paciente-cadastro/paciente.component';
import { PacienteRoutingModule } from './paciente-routing.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    PacienteRoutingModule,
    SharedModule,
    MaterialModule,
  ],
  declarations: [PacienteComponent]
})
export class PacienteModule { }
