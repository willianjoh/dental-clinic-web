import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Cidade } from 'src/app/models/common-models/cidade.interface';
import { Estado } from 'src/app/models/common-models/estados.interface';
import { Generos } from 'src/app/models/common-models/generos.interface';
import { ConsultaCepService } from 'src/app/services/consulta-cep.service';
import { DropdownService } from 'src/app/services/dropdown.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { Endereco } from '../../../models/common-models/endereco.interface';
import { Paciente } from '../../../models/common-models/paciente.interface';
import { CommonUtils } from '../../../util/common-utils';
import { Responsavel } from './../../../models/common-models/paciente.interface';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})
export class PacienteComponent implements OnInit {
  tittle = "Cadastrar Paciente"
  dadosPessoaisForm!: FormGroup;
  enderecoForm!: FormGroup;
  informacoesForm!: FormGroup;
  dadosPessoaisResponsavelForm!: FormGroup;
  showResponsavelForm: boolean = true;
  pacienteId!: number;
  paciente!: Paciente;
  endereco!: Endereco;
  responsavel!: Responsavel;

  generos: Generos[] = [];
  estados: Estado[] = [];
  cidades: Cidade[] = [];

  constructor(private formBuilder: FormBuilder,
    private cepService: ConsultaCepService,
    private pacienteService: PacienteService,
    private dropdownService: DropdownService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.pacienteId = params['id']);
    if (this.pacienteId) {
      this.tittle = "Editar Paciente"
      this.getPaciente()
    }
  }

  ngOnInit() {
    this.buildFormGroup();
    this.getGeneros();
    this.getEstados();
    this.getCidadesPorEstado();
  }

  getPaciente() {
    this.pacienteService.getPacienteById(this.pacienteId)
      .subscribe(resp => {
        this.paciente = resp
        this.endereco = resp.endereco
        this.responsavel = resp.novoResponsavelDTO
        this.paciente.rg = resp.rg.replace(/^(\d\d)(\d{2})(\d{2})(\d{3})(\d{3}).*/, "$1-$2.$3.$4")
        this.paciente.cpf = CommonUtils.formataCPF(resp.cpf)
        this.dadosPessoaisForm.controls['nome'].setValue(resp.nomeCompleto)
        this.dadosPessoaisForm.controls['email'].setValue(resp.email)
        this.dadosPessoaisForm.controls['cpf'].setValue(this.paciente.cpf)
        this.dadosPessoaisForm.controls['dataNascimento'].setValue(resp.dataNascimento)
        this.dadosPessoaisForm.controls['contato'].setValue(resp.celular.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3"))
        this.dadosPessoaisForm.controls['genero'].setValue(resp.genero)
        this.dadosPessoaisForm.controls['rg'].setValue(this.paciente.rg)
        this.dadosPessoaisForm.controls['contatoFixo'].setValue(resp.telefoneFixo.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3"))
        this.dadosPessoaisForm.controls['profissao'].setValue(this.paciente.profissao)
        this.enderecoForm.controls['cep'].setValue(resp.endereco.cep)
        this.enderecoForm.controls['numero'].setValue(resp.endereco.numero)
        this.enderecoForm.controls['complemento'].setValue(resp.endereco.complemento)
        this.informacoesForm.controls['info'].setValue(resp.informacoesAdicionais)

        this.consultaCep()
        if (!resp.maiorIdade) {
          this.showResponsavelForm = true
          this.pacienteService.getResponsavelById(resp.idResponsavel)
            .subscribe(res => {
              this.dadosPessoaisResponsavelForm.controls['nome'].setValue(res.nomeCompleto)
              this.dadosPessoaisResponsavelForm.controls['email'].setValue(res.email)
              this.dadosPessoaisResponsavelForm.controls['cpf'].setValue(res.cpf)
              this.dadosPessoaisResponsavelForm.controls['dataNascimento'].setValue(res.dataNascimento)
              this.dadosPessoaisResponsavelForm.controls['contato'].setValue(res.celular)
              this.dadosPessoaisResponsavelForm.controls['genero'].setValue(res.genero)
              this.dadosPessoaisResponsavelForm.controls['rg'].setValue(res.rg)
              this.dadosPessoaisResponsavelForm.controls['contatoFixo'].setValue(res.telefoneFixo)
              this.dadosPessoaisResponsavelForm.controls['profissao'].setValue(res.profissao)
            })
        }
      })
  }

  private getCidadesPorEstado() {
    this.enderecoForm.controls['estado'].valueChanges
      .pipe(
        map(estado => this.estados.filter(e => e.sigla === estado)),
        map(estados => estados && estados.length > 0 ? estados[0].id : 0),
        switchMap((estadoId: number) => this.dropdownService.getCidades(estadoId)),
      ).subscribe(cidades => this.cidades = cidades);
  }

  private getGeneros() {
    this.generos = [
      { value: "1", descricao: 'Masculino' },
      { value: "2", descricao: 'Feminino' }
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

  verificaEmailValido(formulario: FormGroup, field: string) {
    return formulario.get(field)?.hasError('email');
  }

  mostraTemplateDadosResponsavel() {
    this.showResponsavelForm = !this.showResponsavelForm
    if (this.dadosPessoaisForm.controls['maiorIdade'].value == false) {
      this.adicionaValidatorsForm();
    } else {
      this.clearValidatorsForm();
    }
  }

  adicionaValidatorsForm() {
    this.setValidator(this.dadosPessoaisResponsavelForm.controls['nome'])
    this.setValidator(this.dadosPessoaisResponsavelForm.controls['email'])
    this.setValidator(this.dadosPessoaisResponsavelForm.controls['cpf'])
    this.setValidator(this.dadosPessoaisResponsavelForm.controls['dataNascimento'])
    this.setValidator(this.dadosPessoaisResponsavelForm.controls['contato'])
    this.setValidator(this.dadosPessoaisResponsavelForm.controls['genero'])
  }

  clearValidatorsForm() {
    this.resetValidator(this.dadosPessoaisResponsavelForm.controls['nome'])
    this.resetValidator(this.dadosPessoaisResponsavelForm.controls['email'])
    this.resetValidator(this.dadosPessoaisResponsavelForm.controls['cpf'])
    this.resetValidator(this.dadosPessoaisResponsavelForm.controls['dataNascimento'])
    this.resetValidator(this.dadosPessoaisResponsavelForm.controls['contato'])
    this.resetValidator(this.dadosPessoaisResponsavelForm.controls['genero'])
  }

  private resetValidator(form: AbstractControl) {
    form.clearValidators();
    form.reset();
    form.updateValueAndValidity();
  }

  private setValidator(form: AbstractControl) {
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
    if (this.paciente?.id) {
      const param = this.formatParam()
      this.pacienteService.editar(param, this.paciente.id).pipe(
      ).subscribe(resp => {
        if (resp.id != null) {
          alert("Paciente atualizado com sucesso!")
        } else {
          if (resp.id == null) {
            alert("Não foi possivel realizar o cadastro!")
          }
        }
      })
    } else {
      if (!this.dadosPessoaisForm.valid) {
        CommonUtils.validateAllFields(this.dadosPessoaisForm);
        return
      } else {
        const param = this.formatParam()
        this.pacienteService.salvar(param).pipe(

        ).subscribe(resp => {
          if (resp.id != null) {
            alert("Paciente cadastrado com sucesso!")
          } else {
            if (resp.id == null) {
              alert("Não foi possivel realizar o cadastro!")
            }
          }
        })
      }
    }
  }

  formatParam(): Paciente {
    const endereco: Endereco = {
      cep: this.enderecoForm.get('cep')?.value,
      logradouro: this.enderecoForm.get('logradouro')?.value,
      bairro: this.enderecoForm.get('bairro')?.value,
      cidade: this.enderecoForm.get('cidade')?.value,
      numero: this.enderecoForm.get('numero')?.value,
      complemento: this.enderecoForm.get('complemento')?.value,
      uf: this.enderecoForm.get('estado')?.value
    }

    if (this.dadosPessoaisForm.get('maiorIdade')?.value == false) {
      this.responsavel = {
        nomeCompleto: this.dadosPessoaisResponsavelForm.get('nome')?.value,
        email: this.dadosPessoaisResponsavelForm.get('email')?.value,
        cpf: String(this.dadosPessoaisResponsavelForm.get('cpf')?.value).replace("/[^a-z0-9]/gi", ''),
        dataNascimento: this.dadosPessoaisResponsavelForm.get('dataNascimento')?.value,
        celular: this.dadosPessoaisResponsavelForm.get('contato')?.value,
        telefoneFixo: this.dadosPessoaisResponsavelForm.get('contatoFixo')?.value,
        rg: this.dadosPessoaisResponsavelForm.get('rg')?.value,
        profissao: this.dadosPessoaisResponsavelForm.get('profissao')?.value,
        genero: this.dadosPessoaisResponsavelForm.get('genero')?.value,
        endereco: endereco
      }
    }
    return {
      nomeCompleto: this.dadosPessoaisForm.get('nome')?.value,
      email: this.dadosPessoaisForm.get('email')?.value,
      cpf: String(this.dadosPessoaisForm.get('cpf')?.value).replace("/[^a-z0-9]/gi", ''),
      dataNascimento: this.dadosPessoaisForm.get('dataNascimento')?.value,
      celular: this.dadosPessoaisForm.get('contato')?.value,
      telefoneFixo: this.dadosPessoaisForm.get('contatoFixo')?.value,
      rg: this.dadosPessoaisForm.get('rg')?.value,
      profissao: this.dadosPessoaisForm.get('profissao')?.value,
      genero: this.dadosPessoaisForm.get('genero')?.value,
      maiorIdade: this.dadosPessoaisForm.get('maiorIdade')?.value,
      novoResponsavelDTO: this.responsavel ?? null,
      endereco: endereco,
      informacoesAdicionais: this.informacoesForm.get('info')?.value,
    }
  }
}
