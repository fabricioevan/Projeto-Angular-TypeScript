import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { ProfessorService } from './../../../../services/professor.service';
import { Professor } from './../../../../models/professor';

@Component({
  selector: 'app-listar-professor',
  templateUrl: './listar-professor.component.html',
  styleUrls: ['./listar-professor.component.css']
})
export class ListarProfessorComponent implements OnInit {

  profs: Professor
  professores: Array<Professor> = []

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private professorService: ProfessorService) { }

  ngOnInit(): void {

    this.professorService.listar({ tipo: 1 }).subscribe(profs => {
      this.professores = profs
    })

  }

  editar = (id: any) => {
    this.router.navigate(['nova-conta', id])
  }


  excluir = (id: number) => {
    this.professorService.excluir(id).subscribe(
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
