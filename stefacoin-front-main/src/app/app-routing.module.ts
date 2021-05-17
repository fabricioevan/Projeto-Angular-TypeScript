import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';

import { AulaListarCursoComponent } from './pages/private/aula/aula-listar-curso/aula-listar-curso.component';
import { MatriculaCursoComponent } from './pages/private/curso/matricula-curso/matricula-curso.component';
import { CadastroAlunoComponent } from './pages/private/aluno/cadastro-aluno/cadastro-aluno.component';
import { CadastroAlunoPublicoComponent } from './pages/public/cadastro-aluno-publico/cadastro-aluno-publico.component';
import { AvaliarCursoComponent } from './pages/private/curso/avaliar-curso/avaliar-curso.component';
import { CadastroProfessorComponent } from './pages/private/professor/cadastro-professor/cadastro-professor.component';
import { ExcluirProfessorComponent } from './pages/private/professor/excluir-professor/excluir-professor.component';
import { ExcluirAlunoComponent } from './pages/private/aluno/excluir-aluno/excluir-aluno.component';
import { ExcluirCursoComponent } from './pages/private/curso/excluir-curso/excluir-curso.component';
import { ListarCursoComponent } from './pages/private/curso/listar-curso/listar-curso.component';
import { ListarAulaComponent } from './pages/private/aula/listar-aula/listar-aula.component';
import { CadastrarCursoComponent } from './pages/private/curso/cadastrar-curso/cadastrar-curso.component';
import { CadastrarAulaComponent } from './pages/private/aula/cadastrar-aula/cadastrar-aula.component';
import { ListarAlunoComponent } from './pages/private/aluno/listar-aluno/listar-aluno.component';
import { CadastroHeaderComponent } from './pages/public/cadastro-header/cadastro-header.component';
import { HomeComponent } from './pages/private/home/home.component';
import { CadastroComponent } from './pages/public/cadastro/cadastro.component';
import { LoginComponent } from './pages/public/login/login.component';
import { PaginaNaoEncontradaComponent } from './pages/public/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { ListarProfessorComponent } from './pages/private/professor/listar-professor/listar-professor.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    component: HomeComponent,
  },
  {
    path: 'cadastro',
    component: CadastroHeaderComponent,
  },
  {
    path: 'avaliar-curso',
    component: AvaliarCursoComponent,
  },
  {
    path: 'cadastro-professor-publico',
    component: CadastroComponent,
  },
  {
    path: 'cadastro-professor-publico/:id',
    component: CadastroComponent,
  },
  {
    path: 'cadastro-aluno-publico',
    component: CadastroAlunoPublicoComponent,
  },
  {
    path: 'cadastro-aluno-publico/:id',
    component: CadastroAlunoPublicoComponent,
  },
  {
    path: 'cadastro-professor',
    component: CadastroProfessorComponent,
  },
  {
    path: 'cadastro-professor/:id',
    component: CadastroProfessorComponent,
  },
  {
    path: 'cadastro-aluno',
    component: CadastroAlunoComponent,
  },
  {
    path: 'cadastro-aluno/:id',
    component: CadastroAlunoComponent,
  },
  {
    path: 'novo-curso',
    component: CadastrarCursoComponent,
  },
  {
    path: 'novo-curso/:id',
    component: CadastrarCursoComponent,
  },
  {
    path: 'nova-aula',
    component: CadastrarAulaComponent,
  },
  {
    path: 'nova-aula/:id',
    component: CadastrarAulaComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path:'listar-professor',     
    component: ListarProfessorComponent,
  },
  {
    path:'listar-aluno',     
    component: ListarAlunoComponent,
  },
  {
    path:'listar-curso',     
    component: ListarCursoComponent,
  },
  {
    path:'listar-aula/:id',     
    component: ListarAulaComponent,
  },
  {
    path:'aula-listar-curso',     
    component: AulaListarCursoComponent,
  },
  {
    path:'excluir-curso',     
    component: ExcluirCursoComponent,
  },
  {
    path:'excluir-aluno',     
    component: ExcluirAlunoComponent,
  },
  {
    path:'excluir-professor',     
    component: ExcluirProfessorComponent,
  },
  {
    path:'matricula-curso/:id',     
    component: MatriculaCursoComponent,
  },
  {
    path: '**',
    component: PaginaNaoEncontradaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
