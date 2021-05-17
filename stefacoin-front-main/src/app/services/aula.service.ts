import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Aula } from './../models/aula';
import { Mensagem } from '../models/mensagem';

const URL = 'http://localhost:3000/stefanini/aula';

@Injectable({
  providedIn: 'root'
})


export class AulaService {

  constructor(private httpClient: HttpClient) {}

  listar(filtro?: Partial<Aula>): Observable<Aula[]> {
    return this.httpClient.get<Aula[]>(URL);
  }

  obterPorId(id:number) {
    return this.httpClient.get(`${URL}/${id}`)
  }

  incluir(aula: Partial<Aula>): Observable<Mensagem> {
    return this.httpClient.post<Mensagem>(URL, aula);
  }

  alterar(id: number, aula: Aula) {
    return this.httpClient.put(`${URL}/${id}`,aula)
  }

  excluir(id:number){
    return this.httpClient.delete(`${URL}/${id}`)
  }
}
