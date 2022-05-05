import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtendimentoComponent } from './atendimento-cadastro/atendimento.component';


const routes: Routes = [
  { path: 'cadastroAtendimento', component: AtendimentoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AtendimentoRoutingModule { }
