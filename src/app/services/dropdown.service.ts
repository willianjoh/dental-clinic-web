import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Cidade } from '../models/common-models/cidade.interface';
import { Estado } from '../models/common-models/estados.interface';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) {}

  getEstados() {
    return this.http.get<Estado[]>('assets/dados/estados.json');
  }

  getCidades(idEstado: number) {
    return this.http.get<Cidade[]>('assets/dados/cidades.json')
    .pipe(
      map((cidades: Cidade[]) => cidades.filter(c => c.estado == idEstado))
    );
  }
}
