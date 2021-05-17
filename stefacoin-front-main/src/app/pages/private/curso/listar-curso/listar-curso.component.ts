import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Usuario } from './../../../../models/usuario';
import { Curso } from './../../../../models/curso';
import { CursoService } from './../../../../services/curso.service';

@Component({
  selector: 'app-listar-curso',
  templateUrl: './listar-curso.component.html',
  styleUrls: ['./listar-curso.component.css']
})


export class ListarCursoComponent implements OnInit {

  usuario:Usuario
  curs: Curso
  cursos: Array<Curso> = []

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private cursoService: CursoService) { }

  ngOnInit(): void {
    
      this.cursoService.listar().subscribe(curs => {
      this.cursos = curs
    })

  }

  editar = (id: any) => {
    this.router.navigate(['novo-curso', id])
  }


  excluir = (id: number) => {
    this.cursoService.excluir(id).subscribe(
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
