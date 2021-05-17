import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { CursoService } from './../../../../services/curso.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Curso } from './../../../../models/curso';

@Component({
  selector: 'app-cadastrar-curso',
  templateUrl: './cadastrar-curso.component.html',
  styleUrls: ['./cadastrar-curso.component.css']
})



export class CadastrarCursoComponent implements OnInit {

  id:number  
  textoBotao: string = 'Cadastrar'
  cursos : Curso = {}
  curso : Curso = {}
  cursoForm : FormGroup


  constructor(private router: Router,private activatedRoute : ActivatedRoute, private toastr: ToastrService, private cursoService: CursoService,private fb:FormBuilder) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(parametros =>{
      if(parametros['id']){
        this.textoBotao = 'Editar'
        this.id = parametros['id']  
        this.cursoService.obterPorId(this.id).subscribe(curs =>{
          this.curso = curs
          this.initForm()
        })              
      }else{
        this.initForm()
      }
    })    
  }

  initForm() {
    this.cursoForm = this.fb.group({
      nome: [this.curso.nome, Validators.required],      
      descricao: [this.curso.descricao, Validators.required],
      idProfessor: [this.curso.idProfessor, Validators.required],
      aulas: [this.curso.aulas, Validators.required]
    })
  }    

  alterar = ()=>{
    this.cursoService.alterar(this.id,this.cursoForm.value).subscribe(
      (incluir) => {        
        this.navegar('listar-curso')
      },
      (err) => {
        this.toastr.error(err.error.message);
      },
      () => console.log('Requisição completa'))      
  }

  incluir = () => {
    let curso = this.cursoForm.value;
    curso.aulas = "Iniciando Aulas";
    if(this.textoBotao=='Cadastrar'){
      this.cursoService.incluir(curso).subscribe(
        (incluir) => {        
          this.navegar('listar-curso')
        },
        (err) => {
          this.toastr.error(err.error.message);
        },
        () => console.log('Requisição completa'))                 
    }else{this.alterar()}                      
  }

  navegar = (rota: any) => {
    this.router.navigate([rota])
  }

  salvar = () => {
    if (this.cursoForm.valid) {
      if (!this.id) {
        this.incluir()
      } else {
        this.alterar()
      }
    }
  }

}