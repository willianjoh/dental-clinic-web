import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PacienteService } from 'src/app/services/paciente.service';
import { Atendimento } from '../../../models/common-models/atendimento.interface';
import { Paciente } from '../../../models/common-models/paciente.interface';
import { AtendimentoService } from '../../../services/atendimento.service';

@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento.component.html',
  styleUrls: ['./atendimento.component.scss']
})
export class AtendimentoComponent implements OnInit {
  dadosPessoaisForm!: FormGroup;
  dadosAtendimentoForm!: FormGroup;
  informacoesForm!: FormGroup;
  paciente!: Paciente;
  constructor(private formBuilder: FormBuilder,
    private pacienteService: PacienteService,
    private atendimentoService: AtendimentoService) { }

  ngOnInit() {
    this.buildFormGroup()
  }

  buildFormGroup() {
    this.dadosPessoaisForm = this.formBuilder.group({
      cpf: ['', Validators.required],
      nome: [{ value: null, disabled: true }],
      email: [{ value: null, disabled: true }],
      dataNascimento: [{ value: null, disabled: true }],
      contato: [{ value: null, disabled: true }],
      rg: [{ value: null, disabled: true }],
      contatoFixo: [{ value: null, disabled: true }],
    });

    this.dadosAtendimentoForm = this.formBuilder.group({
      dataAtendimento: ['', Validators.required],
      horario: ['', Validators.required],
      local: ['', Validators.required],
    })

    this.informacoesForm = this.formBuilder.group({
      info: [''],
    });
  }

  isValidated(formulario: FormGroup, field: string) {
    return formulario.get(field)?.invalid && (formulario.get(field)?.dirty || formulario.get(field)?.touched);
  }

  consultarPorCPF() {
    const cpf = this.dadosPessoaisForm.controls['cpf'].value
    if (cpf) {
      this.pacienteService.consultarPorCPF(cpf).subscribe(resp => {
        if(resp){
          this.paciente = resp
          this.setValueForm(resp)
        } else {
          alert("Paciente não encontrado!")
          this.dadosPessoaisForm.reset();
        }
      })
    }
  }

  salvar() {
    const param = this.formatParam()
    if (this.dadosPessoaisForm.valid && this.dadosAtendimentoForm.valid) {
      this.atendimentoService.salvar(param).subscribe(resp => {
        if (resp.id != null) {
          alert("Atendimento cadastrado com sucesso!")
        } else {
          if (resp.id != null) {
            alert("Não foi possivel realizar o cadastro!")
          }
        }
      })
    }

  }

  formatParam(): Atendimento {
    return {
      cpfPaciente: this.dadosPessoaisForm.controls['cpf'].value,
      idPaciente: this.paciente.id,
      nomePaciente: this.paciente.nomeCompleto,
      idDentista: 1,
      dataAtendimento: this.dadosAtendimentoForm.controls['dataAtendimento'].value,
      horario: String(this.dadosAtendimentoForm.controls['horario'].value).replace(/(\d{2})(\d{2})/, "$1:$2"),
      observacao: this.informacoesForm.controls['info'].value,
      local: this.dadosAtendimentoForm.controls['local'].value,
    }
  }

  private setValueForm(data: any) {
    this.dadosPessoaisForm.patchValue({
      nome: data.nomeCompleto,
      email: data.email,
      dataNascimento: data.dataNascimento,
      contato: data.celular,
      rg: data.rg,
      contatoFixo: data.telefoneFixo
    })
  }

}
