import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Usuario } from './models/common-models/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = environment.apiURLBase + '/api/usuario'
  tokenUrl: string = environment.apiURLBase + environment.obterTokenUrl
  clientId: string = environment.clientId
  clientSecret: string = environment.clientSecret

  constructor(private http: HttpClient) { }

  salvarUsuario(usuario: any): Observable<any>{
    return this.http.post<any>(this.apiURL + "/incluir", usuario)
  }

  login(usuario: any): Observable<any> {
    const params = new HttpParams()
                        .set('username', usuario.userName)
                        .set('password', usuario.senha)
                        .set('grant_type', 'password')
    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return this.http.post<any>(this.tokenUrl, params.toString(), {headers})
  }
}
