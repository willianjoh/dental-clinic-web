export interface Orcamento {
  id?: number;
  cpfPaciente: string;
  nomePaciente: string;
  idDentista: number;
  idPaciente?: number;
  observacao: string;
  tipoProcedimento: string;
  valor: string;
  formaPagamento: string;
  dataOrcamento: string;
}
