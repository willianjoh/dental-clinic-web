import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento.component.html',
  styleUrls: ['./atendimento.component.scss']
})
export class AtendimentoComponent implements OnInit {
  dadosPessoaisForm!: FormGroup;
  dadosAtendimentoForm!: FormGroup;
  informacoesForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.buildFormGroup()
  }

  buildFormGroup() {
    this.dadosPessoaisForm = this.formBuilder.group({
      nome: [''],
      email: [''],
      cpf: [''],
      dataNascimento: [''],
      contato: [''],
      rg: [''],
      contatoFixo: [''],
    });

    this.dadosAtendimentoForm = this.formBuilder.group({
      dataAtendimento: [''],
      horario: [''],
      local: [''],
    })

    this.informacoesForm = this.formBuilder.group({
      info: [''],
    });
  }

  isValidated(formulario: FormGroup, field: string) {
    return formulario.get(field)?.invalid && (formulario.get(field)?.dirty || formulario.get(field)?.touched);
  }

}
