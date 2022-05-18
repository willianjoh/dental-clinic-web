import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { LayoutComponent } from 'src/app/template/layout/layout.component';
import { AtendimentoComponent } from './atendimento-cadastro/atendimento.component';


const routes: Routes = [
  {
    path: 'atendimento', component: LayoutComponent, canActivate: [AuthGuard],
    children: [
      { path: 'cadastroAtendimento', component: AtendimentoComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AtendimentoRoutingModule { }
