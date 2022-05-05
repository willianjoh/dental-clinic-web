import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtendimentoComponent } from './atendimento-cadastro/atendimento.component';
import { AtendimentoRoutingModule } from './atendimento-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AtendimentoRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
  ],
  declarations: [AtendimentoComponent]
})
export class AtendimentoModule { }
