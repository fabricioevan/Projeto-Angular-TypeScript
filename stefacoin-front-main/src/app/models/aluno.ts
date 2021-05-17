import { Curso } from './curso';
    
export interface Aluno {
    id?:number;
    nome?: string;
    email?: string;
    senha?: string;
    tipo?: number;
    idade?: string;
    formacao?: string;
    idCurso?:number;
    cursos?: Curso[];
}

