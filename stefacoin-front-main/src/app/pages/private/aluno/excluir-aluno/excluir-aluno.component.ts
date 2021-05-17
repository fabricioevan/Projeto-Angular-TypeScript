import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AlunoService } from './../../../../services/aluno.service';
import { Aluno } from './../../../../models/aluno';

@Component({
  selector: 'app-excluir-aluno',
  templateUrl: './excluir-aluno.component.html',
  styleUrls: ['./excluir-aluno.component.css']
})
export class ExcluirAlunoComponent implements OnInit {

  aluns: Aluno
  alunos: Array<Aluno> = []

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private alunoService: AlunoService) { }

  ngOnInit(): void {

    this.alunoService.listar({ tipo: 2 }).subscribe(aluns => {
      this.alunos = aluns
    })

  }

  editar = (id: any) => {
    this.router.navigate(['cadastro-aluno', id])
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
