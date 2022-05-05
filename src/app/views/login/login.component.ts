import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  loginError: boolean = false;
  cadastrando: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.buildFormGroup()
  }

  buildFormGroup() {
    this.formLogin = this.formBuilder.group({
      login: [''],
      senha: [''],
    });
  }

  onSubmit() {
    this.router.navigate(['/home'])
  }

  cadastrandoNovo(event: any) {
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelaCadastro() {
    this.cadastrando = false
  }

}

