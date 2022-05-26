import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { CommonUtils } from "src/app/util/common-utils";
import { Atendimento } from '../../../models/common-models/atendimento.interface';
import { AtendimentoService } from '../../../services/atendimento.service';

export interface PeriodicElement {
  nomePaciente: string;
  cpfPaciente: number;
  dataAtendimento: string;
  horario: string;
  local: string
  observacao: string;
}

@Component({
  selector: 'app-atendimento-listagem',
  templateUrl: './atendimento-listagem.component.html',
  styleUrls: ['./atendimento-listagem.component.scss']
})


export class AtendimentoListagemComponent implements OnInit {
  dataSource!: Atendimento[];
  displayedColumns: string[] = ['nomePaciente', 'cpfPaciente', 'dataAtendimento', 'horario', 'local', 'observacao'];
  clickedRows = new Set<PeriodicElement>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selected!: Atendimento;

  constructor(private formBuilder: FormBuilder,
    private atendimentoService: AtendimentoService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.buscar()
  }

  buscar(){
    this.atendimentoService.buscarTodos()
    .subscribe(resp =>{
      this.dataSource = resp.map(x => ({
        ...x,
        cpfPaciente: CommonUtils.formataCPF(x.cpfPaciente),
      }))
    })
  }

  deletar(){
   this.atendimentoService.deletar(this.selected.id)
    .subscribe(resp =>{
      alert("Atendimento deletado com sucesso!")
      this.buscar()
    })
  }

  editar(){
    this.router.navigate(['atendimento/editar', this.selected.id])
  }

  onSelect(selected: any) {
    this.selected = selected;
  }
}
