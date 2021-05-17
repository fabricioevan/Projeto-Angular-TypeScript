import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Professor } from 'src/app/models/professor';
import { ProfessorService } from 'src/app/services/professor.service';



@Component({
  selector: 'app-cadastro-professor',
  templateUrl: './cadastro-professor.component.html',
  styleUrls: ['./cadastro-professor.component.css']
})

export class CadastroProfessorComponent implements OnInit {

  id: number

  textoBotao: string = 'Cadastrar'
  profs: Professor = {}
  professor: Professor = {}
  professorForm: FormGroup

  


constructor(private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService, private professorService: ProfessorService, private fb: FormBuilder) { }


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
    senha: [null, Validators.required]
  })

  if (!!this.id) {  
    this.professorForm.get("email").disable()
  } 
}

alterar = () => {
  let professor = this.professorForm.value;
  professor.email = this.professorForm.get("email").value
  this.professorService.alterar(this.id, professor).subscribe(
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
      this.navegar('listar-professor')
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
