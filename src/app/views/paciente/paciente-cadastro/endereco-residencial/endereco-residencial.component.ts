import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Generos} from '../../../../models/common-models/generos.interface'

@Component({
  selector: 'app-endereco-residencial',
  templateUrl: './endereco-residencial.component.html',
  styleUrls: ['./endereco-residencial.component.scss']
})
export class EnderecoResidencialComponent implements OnInit {
  formulario!: FormGroup;
  generos: Generos [] = [];

  ngOnInit() {
    this.formulario = new FormGroup({
      cep: new FormControl(null, [Validators.required]),
      rua: new FormControl(null, [Validators.required]),
      numero: new FormControl(null, [Validators.required]),
      cidade: new FormControl(null, [Validators.required]),
      uf: new FormControl(null, [Validators.required]),
      complementar: new FormControl(null, [Validators.required]),
    })
  }
  getGeneros(){
    this.generos = [
      {value: 1, descricao: 'Masculino'},
      {value: 2, descricao: 'Feminino'}
    ];
  }

}
