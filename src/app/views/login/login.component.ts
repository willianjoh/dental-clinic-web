import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../auth.service';
import { Usuario } from './../../models/common-models/usuario.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  loginError: boolean = false;
  cadastrando: boolean = false;
  loginSucesso: string = "";
  errors: string = "";

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.buildFormGroup()
  }

  buildFormGroup() {
    this.formLogin = this.formBuilder.group({
      login: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  onSubmit() {
    this.clearLocalStorage();
    if (this.formLogin.valid) {
      const param = this.formatUser(this.formLogin);
      this.authService.login(param)
        .subscribe(res => {

          const access_token = JSON.stringify(res)
          localStorage.setItem('access_token', access_token)
          this.router.navigate(['/home'])
        }, error => {
          this.loginError = true;
          this.errors = "Login e/ou senha incorretos."
        })
    } else {
      alert("Campos obrigatórios não preenchidos.")
    }
  }

  clearLocalStorage(){
    localStorage.removeItem('access_token')
  }

  cadastrandoNovo(event: any) {
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelaCadastro() {
    this.cadastrando = false
  }

  cadastrar() {
    if (this.formLogin.valid) {
      const param = this.formatUser(this.formLogin);
      this.authService.salvarUsuario(param).pipe(
        finalize(() => { }),
      ).subscribe((resp) => {
        this.loginSucesso = "Cadastro Efetuado com sucesso! Efetue o Login."
        this.loginError = false;
        this.cadastrando = false
      },
        errorResponse => {
          this.errors = errorResponse.error.message;
          this.loginError = true;
          this.loginSucesso = "";
          this.formLogin.reset();
        });
    } else {
      alert("Campos obrigatórios não preenchidos.")
    }
  }

  formatUser(form: FormGroup): Usuario {
    const value = form.value
    return {
      userName: value.login,
      senha: value.senha
    };
  }

  isValidated(formulario: FormGroup, field: string) {
    return formulario.get(field)?.invalid && (formulario.get(field)?.dirty || formulario.get(field)?.touched);
  }
}

