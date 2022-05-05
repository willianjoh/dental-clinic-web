import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  loginError: boolean = false;
  cadastrando: boolean = false;

  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.buildFormGroup()
  }

  buildFormGroup() {
    this.formLogin = this.formBuilder.group({
      login: [''],
      senha: [''],
    });
  }

  onSubmit() { }

  cadastrandoNovo(event: any){
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelaCadastro(){
    this.cadastrando = false
  }

}

