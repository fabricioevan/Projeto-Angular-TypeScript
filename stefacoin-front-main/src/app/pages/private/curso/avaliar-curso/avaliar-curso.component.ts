import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../../../services/auth.service';
import { AlunoService } from './../../../../services/aluno.service';
import { Aluno } from './../../../../models/aluno';

@Component({
  selector: 'app-avaliar-curso',
  templateUrl: './avaliar-curso.component.html',
  styleUrls: ['./avaliar-curso.component.css']
})

export class AvaliarCursoComponent implements OnInit {

  aluno: Aluno
  

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private alunoService: AlunoService, private authService :AuthService) { }

  ngOnInit(): void {

    this.alunoService.obterPorId(this.authService.getUsuario().id).subscribe(aluno => {
      this.aluno = aluno
    })

  }

  salvar(){
    this.alunoService.alterar(this.aluno.id,this.aluno).subscribe(()=>{})
  }
}

