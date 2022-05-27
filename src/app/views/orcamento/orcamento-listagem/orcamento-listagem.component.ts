import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { OrcamentoService } from "src/app/services/orcamento.service";
import { CommonUtils } from "src/app/util/common-utils";
import { Atendimento } from '../../../models/common-models/atendimento.interface';
import { Orcamento } from '../../../models/common-models/orcamento.interface';

export interface PeriodicElement {
  nomePaciente: string;
  cpfPaciente: number;
  tipoProcedimento: string;
  valor: string;
  dataOrcamento: string
  observacao: string;
}

@Component({
  selector: 'app-orcamento-listagem',
  templateUrl: './orcamento-listagem.component.html',
  styleUrls: ['./orcamento-listagem.component.scss']
})


export class OrcamentoListagemComponent implements OnInit {
  dataSource!: Orcamento[];
  displayedColumns: string[] = ['nomePaciente', 'cpfPaciente', 'tipoProcedimento', 'valor', 'dataOrcamento', 'observacao'];
  clickedRows = new Set<PeriodicElement>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selected!: Atendimento;

  constructor(private formBuilder: FormBuilder,
    private orcamentoService: OrcamentoService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.buscar()
  }

  buscar(){
    this.orcamentoService.buscarTodos()
    .subscribe(resp =>{
      this.dataSource = resp.map(x => ({
        ...x,
        valor: "R$ " + x.valor,
        dataOrcamento: CommonUtils.formatDate(x.dataOrcamento),
        cpfPaciente: CommonUtils.formataCPF(x.cpfPaciente),
      }))
    })
  }

  deletar(){
   this.orcamentoService.deletar(this.selected.id)
    .subscribe(resp =>{
      alert("Orçamento deletado com sucesso!")
      this.buscar()
    })
  }

  editar(){
    this.router.navigate(['orcamento/editar', this.selected.id])
  }

  onSelect(selected: any) {
    this.selected = selected;
  }
}
