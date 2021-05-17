import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AulaService } from './../../../../services/aula.service';
import { Curso } from './../../../../models/curso';
import { CursoService } from './../../../../services/curso.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-listar-aula',
  templateUrl: './listar-aula.component.html',
  styleUrls: ['./listar-aula.component.css']
})
export class ListarAulaComponent implements OnInit {
  id:number
  
  curso : Curso

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private cursoService: CursoService,private aulaService: AulaService ,private authService: AuthService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(parametros =>{
        this.id = parametros['id']  
        this.cursoService.obterPorId(this.id).subscribe(curs =>{
          this.curso = curs
        })  
    })    

  }

  editar = (id: any) => {
    this.router.navigate(['nova-aula', id])
  }  

  excluir = (id: number) => {
    this.aulaService.excluir(id).subscribe(
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
