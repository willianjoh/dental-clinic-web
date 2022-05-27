import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { LayoutComponent } from 'src/app/template/layout/layout.component';
import { AtendimentoComponent } from './atendimento-cadastro/atendimento.component';
import { AtendimentoListagemComponent } from './atendimento-listagem/atendimento-listagem.component';


const routes: Routes = [
  {
    path: 'atendimento', component: LayoutComponent, canActivate: [AuthGuard],
    children: [
      { path: 'cadastro-atendimento', component: AtendimentoComponent },
      { path: 'listagem', component: AtendimentoListagemComponent },
      { path: 'editar/:id', component: AtendimentoComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AtendimentoRoutingModule { }
