import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { LayoutComponent } from 'src/app/template/layout/layout.component';
import { PacienteComponent } from './paciente-cadastro/paciente.component';
import { PacienteListagemComponent } from './paciente-listagem/paciente-listagem.component';


const routes: Routes = [
  {
    path: 'paciente', component: LayoutComponent, canActivate: [AuthGuard],
    children: [
      { path: 'cadastro-paciente', component: PacienteComponent },
      { path: 'listagem', component: PacienteListagemComponent },
      { path: 'editar/:id', component: PacienteComponent },
    ],

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
