import { Endereco } from './endereco.interface';
export interface Paciente {
  id?: number
  nomeCompleto: string;
  email: string;
  cpf: string;
  rg: string;
  dataNascimento: string;
  celular: string;
  genero: string;
  profissao: string;
  telefoneFixo: string;
  endereco: Endereco;
  maiorIdade: number;
  responsavel?: any;
  informacoesAdicionais: string;
}
