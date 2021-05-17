import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { ProfessorPublicoService } from './../../../services/professor-publico.service';
import { Professor } from './../../../models/professor';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})

export class CadastroComponent implements OnInit {

  id: number

  textoBotao: string = 'Cadastrar'
  profs: Professor = {}
  professor: Professor = {}
  professorForm: FormGroup



  constructor(private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService, private professorService: ProfessorPublicoService, private fb: FormBuilder) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(parametros => {
      if (parametros['id']) {
        this.textoBotao = 'Editar'
        this.id = parametros['id']
        console.log("this.id", this.id)
        this.professorService.obterPorId(this.id).subscribe(prof => {
          this.professor = prof
          this.initForm()
        })

      } else {
        this.initForm()
      }


    })
  }
  initForm() {
    this.professorForm = this.fb.group({
      nome: [this.professor.nome, Validators.required],
      email: [this.professor.email, [Validators.required, Validators.email]],
      senha: [this.professor.senha, Validators.required]
    })

    if (!!this.id) {
      this.professorForm.get("email").disable()
    }
  }

  alterar = () => {
    this.professorService.alterar(this.id, this.professorForm.value).subscribe(
      (incluir) => {
        this.navegar('listar-professor')
      },
      (err) => {
        this.toastr.error(err.error.message);
      },
      () => console.log('Requisição completa'))
  }


  incluir = () => {
    this.professorService.incluir(this.professorForm.value).subscribe(
      (incluir) => {
        this.navegar('')
      },
      (err) => {
        this.toastr.error(err.error.message);
      },
      () => console.log('Requisição completa'))
  }
  navegar = (rota: any) => {
    this.router.navigate([rota])
  }

  salvar = () => {
    if (this.professorForm.valid) {
      if (!this.id) {
        this.incluir()
      } else {
        this.alterar()
      }
    }
  }
}
