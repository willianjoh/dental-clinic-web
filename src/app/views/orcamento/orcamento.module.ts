import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { OrcamentoComponent } from './orcamento-cadastro/orcamento.component';
import { OrcamentoRoutingModule } from './orcamento-routing.module';
import { OrcamentoListagemComponent } from './orcamento-listagem/orcamento-listagem.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    OrcamentoRoutingModule,
    SharedModule,
    MaterialModule,
  ],
  declarations: [OrcamentoComponent, OrcamentoListagemComponent]
})
export class OrcamentoModule { }
