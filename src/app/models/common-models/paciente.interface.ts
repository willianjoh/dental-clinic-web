import { Endereco } from './endereco.interface';
export interface Paciente {
  id?: number
  nomeCompleto: string;
  email: string;
  cpf: string;
  rg: string;
  dataNascimento: string;
  novoResponsavelDTO: Responsavel;
  celular: string;
  genero: string;
  profissao: string;
  telefoneFixo: string;
  endereco: Endereco;
  maiorIdade: boolean;
  idResponsavel?: number;
  informacoesAdicionais: string;
}

export interface Responsavel {
  nomeCompleto?: string;
  email?: string;
  cpf?: string;
  rg?: string;
  dataNascimento?: string;
  celular?: string;
  genero?: string;
  profissao?: string;
  telefoneFixo?: string;
  endereco: Endereco;
}
