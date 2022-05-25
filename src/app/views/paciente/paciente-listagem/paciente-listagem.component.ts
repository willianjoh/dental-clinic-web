import { CommonUtils } from './../../../util/common-utils';
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { PacienteService } from "src/app/services/paciente.service";
import { Paciente } from '../../../models/common-models/paciente.interface';
import { Router } from '@angular/router';

export interface PeriodicElement {
  nomeCompleto: string;
  cpf: number;
  dataNascimento: number;
  celular: string;
}

@Component({
  selector: 'app-paciente-listagem',
  templateUrl: './paciente-listagem.component.html',
  styleUrls: ['./paciente-listagem.component.scss']
})

export class PacienteListagemComponent implements OnInit {
  dataSource!: any[];
  displayedColumns: string[] = ['nomeCompleto', 'cpf', 'dataNascimento', 'celular'];
  clickedRows = new Set<PeriodicElement>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selected!: Paciente;

  constructor(private formBuilder: FormBuilder,
    private pacienteService: PacienteService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.buscar()
  }

  buscar(){
    this.pacienteService.buscarTodos()
    .subscribe(resp =>{
      this.dataSource = resp.map(x => ({
        ...x,
        cpf: CommonUtils.formataCPF(x.cpf),
        celular: x.celular.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3")
      }))
    })
  }

  deletar(){
    this.pacienteService.deletar(this.selected.id)
    .subscribe(resp =>{
      alert("Paciente deletado com sucesso!")
      this.buscar()
    })
  }

  editar(){
    this.router.navigate(['paciente/editar', this.selected.id])
  }

  onSelect(selected: any) {
    this.selected = selected;
  }
}
