import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/template/layout/layout.component';
import { PacienteComponent } from './paciente-cadastro/paciente.component';


const routes: Routes = [
  {
    path: 'paciente', component: LayoutComponent, children: [
      { path: 'cadastroPaciente', component: PacienteComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
