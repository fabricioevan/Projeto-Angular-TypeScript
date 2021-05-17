import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Aluno } from './../models/aluno';
import { Mensagem } from '../models/mensagem';


const URL = 'http://localhost:3000/stefanini/aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  constructor(private httpClient: HttpClient) { }
  listar(filtro: Partial<Aluno>): Observable<Aluno[]> {
    const tipo = filtro.tipo.toString();   
    return this.httpClient.get<Aluno[]>(URL, {
      params:{tipo},
    });
  }

  obterPorId(id:number) {
    return this.httpClient.get(`${URL}/${id}`)
  }

  incluir(aluno: Partial<Aluno>): Observable<Mensagem> {
    return this.httpClient.post<Mensagem>(URL, aluno);
  }

  alterar(id: number, aluno: Aluno) {
    return this.httpClient.put(`${URL}/${id}`,aluno)
  }

  excluir(id:number){
    return this.httpClient.delete(`${URL}/${id}`)
  }
}

