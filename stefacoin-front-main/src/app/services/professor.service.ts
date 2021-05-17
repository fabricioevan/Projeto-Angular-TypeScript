import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Mensagem } from '../models/mensagem';
import { Professor } from '../models/professor';

const URL = 'http://localhost:3000/stefanini/professor';

@Injectable({
  providedIn: 'root',
})
export class ProfessorService {
  constructor(private httpClient: HttpClient) {}


  // listar(professor: Professor): Observable<Professor[]> {
  //   return this.httpClient.post<Professor[]>(URL, professor)
  // }

  // listar(professor: Professor): Observable<Mensagem> {
  //   return this.httpClient.get<Professor>(URL,professor[]);
  // }

  
  #pegabandeira
  listar(filtro: Partial<Professor>): Observable<Professor[]> {
    const tipo = filtro.tipo.toString();   
    return this.httpClient.get<Professor[]>(URL, {
      params:{tipo},
    });
  }

  obterPorId(id:number) {
    return this.httpClient.get(`${URL}/${id}`)
  }

  incluir(professor: Partial<Professor>): Observable<Mensagem> {
    return this.httpClient.post<Mensagem>(URL, professor);
  }

  alterar(id: number, professor: Professor) {
    return this.httpClient.put(`${URL}/${id}`,professor)
  }

  excluir(id:number){
    return this.httpClient.delete(`${URL}/${id}`)
  }
}
