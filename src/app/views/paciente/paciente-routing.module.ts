import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacienteComponent } from './paciente-cadastro/paciente.component';


const routes: Routes = [
  { path: 'cadastroPaciente', component: PacienteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PacienteRoutingModule { }
