import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, switchMap } from 'rxjs';
import { Cidade } from 'src/app/models/common-models/cidade.interface';
import { Estado } from 'src/app/models/common-models/estados.interface';
import { Generos } from 'src/app/models/common-models/generos.interface';
import { ConsultaCepService } from 'src/app/services/consulta-cep.service';
import { DropdownService } from 'src/app/services/dropdown.service';
import { CommonUtils } from '../../../util/common-utils';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})
export class PacienteComponent implements OnInit {

  dadosPessoaisForm!: FormGroup;
  enderecoForm!: FormGroup;
  informacoesForm!: FormGroup;
  dadosPessoaisResponsavelForm!: FormGroup;
  showResponsavelForm: boolean = true;

  generos: Generos[] = [];
  estados: Estado[] = [];
  cidades: Cidade[] = [];

  constructor(private formBuilder: FormBuilder,
    private cepService: ConsultaCepService,
    private dropdownService: DropdownService) {
  }

  ngOnInit() {
    this.buildFormGroup();
    this.getGeneros();
    this.getEstados();
    this.getCidadesPorEstado();
  }

  private getCidadesPorEstado(){
    this.enderecoForm.controls['estado'].valueChanges
    .pipe(
      map(estado => this.estados.filter(e => e.sigla === estado)),
      map(estados => estados && estados.length > 0 ? estados[0].id : 0),
      switchMap((estadoId: number) => this.dropdownService.getCidades(estadoId)),
    ).subscribe(cidades => this.cidades = cidades);
  }

  private getGeneros() {
    this.generos = [
      { value: 1, descricao: 'Masculino' },
      { value: 2, descricao: 'Feminino' }
    ];
  }
  private getEstados() {
    this.dropdownService.getEstados()
      .subscribe(dados => this.estados = dados);
  }

  buildFormGroup() {
    this.dadosPessoaisForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      contato: ['', Validators.required],
      genero: ['', Validators.required],
      rg: [''],
      contatoFixo: [''],
      profissao: [''],
      maiorIdade: [''],
    });

    this.dadosPessoaisResponsavelForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      cpf: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      contato: ['', Validators.required],
      genero: ['', Validators.required],
      rg: [''],
      contatoFixo: [''],
      profissao: [''],
    });

    this.enderecoForm = this.formBuilder.group({
      cep: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      logradouro: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
    });

    this.informacoesForm = this.formBuilder.group({
      info: [''],
    });

  }

  isValidated(formulario: FormGroup, field: string) {
    return formulario.get(field)?.invalid && (formulario.get(field)?.dirty || formulario.get(field)?.touched);
  }

  verificaEmailValido(formulario: FormGroup, field: string){
    return formulario.get(field)?.hasError('email');
  }

  nextTabValidation() {
    if (!this.dadosPessoaisForm.valid || !this.dadosPessoaisResponsavelForm.valid || !this.enderecoForm.valid) {
      CommonUtils.validateAllFields(this.dadosPessoaisForm);
    }
  }

  mostraTemplateDadosResponsavel(){
    this.showResponsavelForm = !this.showResponsavelForm
    if(this.dadosPessoaisForm.get('maiorIdade')?.value == false){
      this.adicionaValidatorsForm();
    } else {
      this.clearValidatorsForm();
    }
  }

  adicionaValidatorsForm(){
    this.setValidator(this.dadosPessoaisResponsavelForm.controls['nome'])
    this.setValidator(this.dadosPessoaisResponsavelForm.controls['email'])
    this.setValidator(this.dadosPessoaisResponsavelForm.controls['cpf'])
    this.setValidator(this.dadosPessoaisResponsavelForm.controls['dataNascimento'])
    this.setValidator(this.dadosPessoaisResponsavelForm.controls['contato'])
    this.setValidator(this.dadosPessoaisResponsavelForm.controls['genero'])
  }

  clearValidatorsForm(){
    this.resetValidator(this.dadosPessoaisResponsavelForm.controls['nome'])
    this.resetValidator(this.dadosPessoaisResponsavelForm.controls['email'])
    this.resetValidator(this.dadosPessoaisResponsavelForm.controls['cpf'])
    this.resetValidator(this.dadosPessoaisResponsavelForm.controls['dataNascimento'])
    this.resetValidator(this.dadosPessoaisResponsavelForm.controls['contato'])
    this.resetValidator(this.dadosPessoaisResponsavelForm.controls['genero'])
  }

  private resetValidator(form: AbstractControl){
      form.clearValidators();
      form.reset();
      form.updateValueAndValidity();
  }

  private setValidator(form: AbstractControl){
    form.setValidators([Validators.required])
    form.reset();
    form.updateValueAndValidity();
  }

  consultaCep() {
    let cep = this.enderecoForm.get('cep')?.value;
    cep = cep.replace(/\D/g, '')

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
        .subscribe(resp => this.setValueForm(resp))
    }
  }

  private setValueForm(data: any) {
    this.enderecoForm.patchValue({
      logradouro: data.logradouro,
      complemento: data.complemento,
      bairro: data.bairro,
      cidade: data.localidade,
      estado: data.uf
    })
  }

  salvar() {
    if (!this.dadosPessoaisForm.valid) {
      CommonUtils.validateAllFields(this.dadosPessoaisForm);
    }
  }
}
