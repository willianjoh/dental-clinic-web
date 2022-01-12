import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.scss']
})
export class DadosPessoaisComponent implements OnInit {
  formulario!: FormGroup;

  constructor() { }

  ngOnInit() {
    this.formulario = new FormGroup({
      nome: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      cpf: new FormControl(null, [Validators.required]),
      rg: new FormControl(null),
      contato: new FormControl(null, [Validators.required]),
      contatoFixo: new FormControl(null),
      genero: new FormControl(null, [Validators.required]),
      dataNascimento: new FormControl(null, [Validators.required]),
    })
  }

  isValidated(field: string){
    return this.formulario.get(field)?.invalid && (this.formulario.get(field)?.dirty || this.formulario.get(field)?.touched)
  }
}
