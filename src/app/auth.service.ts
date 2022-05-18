import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = environment.apiURLBase + '/api/usuario'
  tokenUrl: string = environment.apiURLBase + environment.obterTokenUrl
  clientId: string = environment.clientId
  clientSecret: string = environment.clientSecret
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  obterToken() {
    const tokenStr = localStorage.getItem('access_token')
    if (tokenStr) {
      const token = JSON.parse(tokenStr).access_token
      return token;
    }
    return null;
  }

  salvarUsuario(usuario: any): Observable<any> {
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
    return this.http.post<any>(this.tokenUrl, params.toString(), { headers })
  }

  isAuthenticated(): boolean {
    const token = this.obterToken();
    if (token) {
      const expired = this.jwtHelper.isTokenExpired(token);
      return !expired
    }
    return false;
  }
}
