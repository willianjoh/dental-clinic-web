import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';
import { Atendimento } from '../models/common-models/atendimento.interface';

@Injectable({
  providedIn: 'root'
})
export class  AtendimentoService {
  apiURL: string = environment.apiURLBase + '/api/atendimento'

  constructor(private http: HttpClient) { }

  salvar(atendimento: Atendimento): Observable<Atendimento> {
    return this.http.post<Atendimento>(this.apiURL + '/incluir', atendimento)
  }
}
