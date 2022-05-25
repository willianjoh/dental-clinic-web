export interface Atendimento {
  id?: number;
  cpfPaciente: string;
  idPaciente?: number;
  nomePaciente: string;
  idDentista: number;
  observacao: string;
  dataAtendimento: string;
  horario: string;
  local: string;
}
