import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AlunoPublicoService } from 'src/app/services/aluno-publico.service';
import { Aluno } from './../../../../models/aluno';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-cadastro-aluno',
  templateUrl: './cadastro-aluno.component.html',
  styleUrls: ['./cadastro-aluno.component.css']
})


export class CadastroAlunoComponent implements OnInit {

  id: number
  textoBotao: string = 'Cadastrar'
  aluns: Aluno = {}
  aluno: Aluno = {}
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
      senha: [null, Validators.required],
      formacao: [this.aluno.formacao, Validators.required],
      idade: [this.aluno.nome, Validators.required],
      idCurso: [this.aluno.idCurso, Validators.required]
    })
    if (!!this.id) {
      this.alunoForm.get("email").disable()
    }
  }
  alterar = () => {
    let aluno = this.alunoForm.value;
    aluno.email = this.alunoForm.get("email").value
    this.alunoService.alterar(this.id, aluno).subscribe(
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