import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Aluno } from './../../../../models/aluno';
import { Curso } from 'src/app/models/curso';
import { AlunoService } from './../../../../services/aluno.service';

@Component({
  selector: 'app-listar-aluno',
  templateUrl: './listar-aluno.component.html',
  styleUrls: ['./listar-aluno.component.css']
})

export class ListarAlunoComponent implements OnInit {

  curso:Curso
  aluns: Aluno
  alunos: Array<Aluno> = []

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private alunoService: AlunoService) { }

  ngOnInit(): void {

    this.alunoService.listar({ tipo: 2 }).subscribe(aluns => {
      this.alunos = aluns
    })

  }

  editar = (id: any) => {
    this.router.navigate(['nova-contaA', id])
  }


  excluir = (id: number) => {
    this.alunoService.excluir(id).subscribe(
      sucess => console.log('Deletou'),
      error => console.log('Deu ruim'),
      () => console.log('Requisição completa')

    )
    window.location.reload();    
  }

  navegar = (rota: any) => {
    this.router.navigate([rota])
  }
}

