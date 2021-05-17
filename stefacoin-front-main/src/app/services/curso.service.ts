import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Curso } from './../models/curso';
import { Mensagem } from '../models/mensagem';


const URL = 'http://localhost:3000/stefanini/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  constructor(private httpClient: HttpClient) {}

  listar(filtro?: Partial<Curso>): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(URL);
  }

  obterPorId(id:number) {
    return this.httpClient.get(`${URL}/${id}`)
  }

  incluir(curso: Partial<Curso>): Observable<Mensagem> {
    return this.httpClient.post<Mensagem>(URL, curso);
  }

  alterar(id: number, curso: Curso) {
    return this.httpClient.put(`${URL}/${id}`,curso)
  }

  excluir(id:number){
    return this.httpClient.delete(`${URL}/${id}`)
  }
}
