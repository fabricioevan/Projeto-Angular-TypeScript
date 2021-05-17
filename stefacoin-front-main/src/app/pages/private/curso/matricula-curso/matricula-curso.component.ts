import { AlunoService } from './../../../../services/aluno.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Aluno } from 'src/app/models/aluno';

@Component({
  selector: 'app-matricula-curso',
  templateUrl: './matricula-curso.component.html',
  styleUrls: ['./matricula-curso.component.css']
})
export class MatriculaCursoComponent implements OnInit {

  id: number
  textoBotao: string = 'Cadastrar'
  aluns: Aluno = {}
  aluno:  Aluno =  {}
  matriculaForm: FormGroup


  constructor(private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService, private alunoService: AlunoService, private fb: FormBuilder) { }


  ngOnInit(): void {

    this.activatedRoute.params.subscribe(parametros => {
      if (parametros['id']) {
        this.textoBotao = 'Matricular'
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
    this.matriculaForm = this.fb.group({
      nome: [this.aluno.nome, Validators.required],
      email: [this.aluno.email, [Validators.required, Validators.email]],
      senha: [this.aluno.senha, Validators.required],
      formacao: [this.aluno.formacao, Validators.required],
      idade: [this.aluno.nome, Validators.required],      
      idCurso: [this.aluno.idCurso, Validators.required]
    })
    if (!!this.id) {
      this.matriculaForm.get("nome").disable()
      this.matriculaForm.get("email").disable()
      this.matriculaForm.get("senha").disable()
      this.matriculaForm.get("idade").disable()
      this.matriculaForm.get("formacao").disable()
    }
  }
  alterar = () => {
    this.alunoService.alterar(this.id, this.matriculaForm.value).subscribe(
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
      this.alunoService.incluir(this.matriculaForm.value).subscribe(
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
    if (this.matriculaForm.valid) {
      if (!this.id) {
        this.incluir()
      } else {
        this.alterar()
      }
    }
  }

}
