import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Aluno } from './../../../models/aluno';
import { AlunoPublicoService } from './../../../services/aluno-publico.service';



@Component({
  selector: 'app-cadastro-aluno-publico',
  templateUrl: './cadastro-aluno-publico.component.html',
  styleUrls: ['./cadastro-aluno-publico.component.css']
})


export class CadastroAlunoPublicoComponent implements OnInit {

  id: number
  textoBotao: string = 'Cadastrar'
  aluns: Aluno = {}
  aluno:  Aluno =  {}
  alunoForm: FormGroup


  constructor(private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService, private alunoService: AlunoPublicoService, private fb: FormBuilder) { }


  ngOnInit(): void {

    this.activatedRoute.params.subscribe(parametros => {
      if (parametros['id']) {
        this.textoBotao = 'Editar'
        this.id = parametros['id']
        console.log("this.id", this.id)
        this.alunoService.obterPorId(this.id).subscribe(alun => {
          this.aluno = alun
          this.initForm()
        })
      } else {
        this.initForm()
      }

    })
  }

  initForm() {
    this.alunoForm = this.fb.group({
      nome: [this.aluno.nome, Validators.required],
      email: [this.aluno.email, [Validators.required, Validators.email]],
      senha: [this.aluno.senha, Validators.required],
      formacao: [this.aluno.formacao, Validators.required],
      idade: [this.aluno.nome, Validators.required],      
      idCurso: [this.aluno.idCurso, Validators.required]
    })
    if (!!this.id) {
      this.alunoForm.get("email").disable()
    }
  }
  alterar = () => {
    this.alunoService.alterar(this.id, this.alunoForm.value).subscribe(
      (incluir) => {
        this.navegar('listar-aluno')
      },
      (err) => {
        this.toastr.error(err.error.message);
      },
      () => console.log('Requisição completa'))
  }

  incluir = () => {
    if (this.textoBotao == 'Cadastrar') {
      this.alunoService.incluir(this.alunoForm.value).subscribe(
        (incluir) => {
          this.navegar('')
        },
        (err) => {
          this.toastr.error(err.error.message);
        },
        () => console.log('Requisição completa'))
    } else { this.alterar() }
  }

  navegar = (rota: any) => {
    this.router.navigate([rota])
  }

  salvar = () => {
    if (this.alunoForm.valid) {
      if (!this.id) {
        this.incluir()
      } else {
        this.alterar()
      }
    }
  }

}