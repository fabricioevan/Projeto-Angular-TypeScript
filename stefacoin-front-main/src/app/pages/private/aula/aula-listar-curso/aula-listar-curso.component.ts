import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Curso } from 'src/app/models/curso';
import { Usuario } from 'src/app/models/usuario';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-aula-listar-curso',
  templateUrl: './aula-listar-curso.component.html',
  styleUrls: ['./aula-listar-curso.component.css']
})
export class AulaListarCursoComponent implements OnInit {

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

  listar=(id:any)=>{
    this.router.navigate(['listar-aula',id])
  }
  
  
  
}

