import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Usuario } from '../models/common-models/usuario.interface';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { Paciente, Responsavel } from '../models/common-models/paciente.interface';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  apiURL: string = environment.apiURLBase + '/api/paciente'
  apiURLResponsavel: string = environment.apiURLBase + '/api/responsavel'


  constructor(private http: HttpClient) { }

  salvar(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(this.apiURL + '/incluir', paciente)
  }

  editar(paciente: Paciente, id: any): Observable<Paciente> {
    return this.http.put<Paciente>(this.apiURL + `/editar/${id}`, paciente)
  }

  buscarTodos(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.apiURL + '/listagem')
  }

  getPacienteById(id: any): Observable<Paciente> {
    return this.http.get<Paciente>(this.apiURL + '/buscarPorId?id=' + id)
  }

  getResponsavelById(id: any): Observable<Responsavel> {
    return this.http.get<Responsavel>(this.apiURLResponsavel + '/buscarPorId?id=' + id)
  }

  deletar(id: any): Observable<Paciente> {
    return this.http.get<Paciente>(this.apiURL + '/deletar?id=' + id)
  }

  consultarPorCPF(cpf: string): Observable<Paciente>{
    return this.http.get<Paciente>(this.apiURL + '/consultarPorCPF?cpf=' + cpf)
  }
}
