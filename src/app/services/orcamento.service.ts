import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { environment } from "src/environments/environment"
import { Orcamento } from '../models/common-models/orcamento.interface';

@Injectable({
  providedIn: 'root'
})
export class  OrcamentoService {
  apiURL: string = environment.apiURLBase + '/api/orcamento'

  constructor(private http: HttpClient) { }

  salvar(orcamento: Orcamento): Observable<Orcamento> {
    return this.http.post<Orcamento>(this.apiURL + '/incluir', orcamento)
  }

  buscarTodos(): Observable<Orcamento[]> {
    return this.http.get<Orcamento[]>(this.apiURL + '/listagem')
  }

  getAtendimentoById(id: any): Observable<Orcamento> {
    return this.http.get<Orcamento>(this.apiURL + '/buscarPorId?id=' + id)
  }

  deletar(id: any): Observable<Orcamento> {
    return this.http.get<Orcamento>(this.apiURL + '/deletar?id=' + id)
  }

  editar(orcamento: Orcamento, id: any): Observable<Orcamento> {
    return this.http.put<Orcamento>(this.apiURL + `/editar/${id}`, orcamento)
  }
}
