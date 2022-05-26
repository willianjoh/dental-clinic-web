import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { LayoutComponent } from 'src/app/template/layout/layout.component';
import { OrcamentoComponent } from './orcamento-cadastro/orcamento.component';


const routes: Routes = [
  {
    path: 'orcamento', component: LayoutComponent, canActivate: [AuthGuard],
    children: [
      { path: 'cadastro-orcamento', component: OrcamentoComponent },
      //{ path: 'listagem', component:  },
      { path: 'editar/:id', component: OrcamentoComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class OrcamentoRoutingModule { }
