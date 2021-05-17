import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AulaService } from './../../../../services/aula.service';
import { ToastrService } from 'ngx-toastr';
import { Aula } from './../../../../models/aula';

@Component({
  selector: 'app-cadastrar-aula',
  templateUrl: './cadastrar-aula.component.html',
  styleUrls: ['./cadastrar-aula.component.css']
})


export class CadastrarAulaComponent implements OnInit {

  id:number  
  textoBotao: string = 'Cadastrar'
  aulas : Aula = {}
  aula : Aula = {}
  aulaForm: FormGroup

  constructor(private router: Router,private activatedRoute : ActivatedRoute, private toastr: ToastrService, private aulaService: AulaService,private fb:FormBuilder) { }


  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(parametros =>{
      if(parametros['id']){
        this.textoBotao = 'Editar'
        this.id = parametros['id']  
        this.aulaService.obterPorId(this.id).subscribe(auls =>{
          this.aula = auls
          this.initForm()
        })              
      }else{
        this.initForm()
      } 
    })    
  }

  initForm() {
    this.aulaForm = this.fb.group({
      nome: [this.aula.nome, Validators.required],
      duracao: [this.aula.duracao, Validators.required],
      topicos: [this.aula.topicos, Validators.required],
      idCurso: [this.aula.idCurso, Validators.required],
    })
    
  }

  alterar = ()=>{
    this.aulaService.alterar(this.id,this.aulaForm.value).subscribe(
      (incluir) => {        
        this.navegar('listar-curso')
      },
      (err) => {
        this.toastr.error(err.error.message);
      },
      () => console.log('Requisição completa'))      
  }

  incluir = () => {
    if(this.textoBotao=='Cadastrar'){
      this.aulaService.incluir(this.aulaForm.value).subscribe(
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
    if (this.aulaForm.valid) {
      if (!this.id) {
        this.incluir()
      } else {
        this.alterar()
      }
    }
  }

}
