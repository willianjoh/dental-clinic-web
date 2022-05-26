import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Paciente } from "src/app/models/common-models/paciente.interface";
import { OrcamentoService } from "src/app/services/orcamento.service";
import { PacienteService } from "src/app/services/paciente.service";
import { Orcamento } from '../../../models/common-models/orcamento.interface';

@Component({
  selector: 'app-atendimento',
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.scss']
})
export class OrcamentoComponent implements OnInit {
  tittle = "Cadastrar Orçamento"
  dadosForm!: FormGroup;
  dadosOrcamentoForm!: FormGroup;
  orcamento!: Orcamento;
  orcamentoId: any
  paciente!: Paciente

  constructor(private formBuilder: FormBuilder,
    private pacienteService: PacienteService,
    private orcamentoService: OrcamentoService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.orcamentoId = params['id']);
    if (this.orcamentoId) {
      this.tittle = "Editar Atendimento"
    }
  }

  ngOnInit(): void {
    this.buildFormGroup();
  }

  buildFormGroup() {
    this.dadosForm = this.formBuilder.group({
      cpf: ['', Validators.required],
      nome: [{ value: null, disabled: true }],
      email: [{ value: null, disabled: true }],
      dataNascimento: [{ value: null, disabled: true }],
      contato: [{ value: null, disabled: true }],
      rg: [{ value: null, disabled: true }],
      contatoFixo: [{ value: null, disabled: true }],
    });

    this.dadosOrcamentoForm = this.formBuilder.group({
      formaPagamento: [''],
      observacao: [''],
      dataOrcamento: ['', Validators.required],
      tipoProcedimento: ['', Validators.required],
      valor: ['', Validators.required],
    })

  }

  salvar() {
    if (this.orcamento?.id) {
      const param = this.formatParam()
      this.orcamentoService.editar(param, this.orcamentoId).subscribe(resp => {
        if (resp.id != null) {
          alert("Orçamento atualizado com sucesso!")
        } else {
          if (resp.id != null) {
            alert("Não foi possivel realizar o cadastro!")
          }
        }
      })
    } else {
      const param = this.formatParam()
      if (this.dadosForm.valid && this.dadosOrcamentoForm.valid) {
        this.orcamentoService.salvar(param).subscribe(resp => {
          if (resp.id != null) {
            alert("Orçamento cadastrado com sucesso!")
          } else {
            if (resp.id != null) {
              alert("Não foi possivel realizar o cadastro!")
            }
          }
        })
      }
    }

  }

  formatParam(): Orcamento {
    return {
      cpfPaciente: this.dadosForm.controls['cpf'].value,
      idPaciente: this.paciente.id,
      nomePaciente: this.paciente.nomeCompleto,
      idDentista: 1,
      observacao: this.dadosOrcamentoForm.controls['observacao'].value,
      dataOrcamento: this.dadosOrcamentoForm.controls['dataOrcamento'].value,
      formaPagamento: this.dadosOrcamentoForm.controls['formaPagamento'].value,
      tipoProcedimento: this.dadosOrcamentoForm.controls['tipoProcedimento'].value,
      valor: this.dadosOrcamentoForm.controls['valor'].value,
    }
  }

  consultarPorCPF() {
    const cpf = this.dadosForm.controls['cpf'].value
    if (cpf) {
      this.pacienteService.consultarPorCPF(cpf).subscribe(resp => {
        if (resp) {
          this.paciente = resp
          this.setValueForm(resp)
        } else {
          alert("Paciente não encontrado!")
          this.dadosForm.reset();
        }
      })
    }
  }

  private setValueForm(data: any) {
    this.dadosForm.patchValue({
      nome: data.nomeCompleto,
      email: data.email,
      dataNascimento: data.dataNascimento,
      contato: data.celular,
      rg: data.rg,
      contatoFixo: data.telefoneFixo
    })
  }

  isValidated(formulario: FormGroup, field: string) {
    return formulario.get(field)?.invalid && (formulario.get(field)?.dirty || formulario.get(field)?.touched);
  }
}
