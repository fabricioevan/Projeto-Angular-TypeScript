import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { HttpInterceptorService } from './interceptors/http-interceptor.service';

import { CadastroAlunoComponent } from './pages/private/aluno/cadastro-aluno/cadastro-aluno.component';
import { CadastroAlunoPublicoComponent } from './pages/public/cadastro-aluno-publico/cadastro-aluno-publico.component';
import { AvaliarCursoComponent } from './pages/private/curso/avaliar-curso/avaliar-curso.component';
import { CadastroProfessorComponent } from './pages/private/professor/cadastro-professor/cadastro-professor.component';
import { HomeComponent } from './pages/private/home/home.component';
import { ListarProfessorComponent } from './pages/private/professor/listar-professor/listar-professor.component';
import { CadastroComponent } from './pages/public/cadastro/cadastro.component';
import { LoginComponent } from './pages/public/login/login.component';
import { PaginaNaoEncontradaComponent } from './pages/public/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { ListarAlunoComponent } from './pages/private/aluno/listar-aluno/listar-aluno.component';
import { CadastroHeaderComponent } from './pages/public/cadastro-header/cadastro-header.component';
import { ListarCursoComponent } from './pages/private/curso/listar-curso/listar-curso.component';
import { ListarAulaComponent } from './pages/private/aula/listar-aula/listar-aula.component';
import { CadastrarCursoComponent } from './pages/private/curso/cadastrar-curso/cadastrar-curso.component';
import { CadastrarAulaComponent } from './pages/private/aula/cadastrar-aula/cadastrar-aula.component';
import { ExcluirCursoComponent } from './pages/private/curso/excluir-curso/excluir-curso.component';
import { ExcluirAlunoComponent } from './pages/private/aluno/excluir-aluno/excluir-aluno.component';
import { ExcluirProfessorComponent } from './pages/private/professor/excluir-professor/excluir-professor.component';
import { MatriculaCursoComponent } from './pages/private/curso/matricula-curso/matricula-curso.component';
import { AulaListarCursoComponent } from './pages/private/aula/aula-listar-curso/aula-listar-curso.component';

export function tokenGetter() {
  return localStorage.getItem('jwttoken');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListarProfessorComponent,
    CadastroComponent,
    HomeComponent,
    PaginaNaoEncontradaComponent,
    HeaderComponent,
    ListarAlunoComponent,
    CadastroHeaderComponent,
    CadastroAlunoComponent,
    ListarCursoComponent,
    ListarAulaComponent,
    CadastrarCursoComponent,
    CadastrarAulaComponent,
    ExcluirCursoComponent,
    ExcluirAlunoComponent,
    ExcluirProfessorComponent,
    CadastroProfessorComponent,
    AvaliarCursoComponent,
    CadastroAlunoPublicoComponent,
    MatriculaCursoComponent,
    AulaListarCursoComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgbModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
  ],
  providers: [
    HttpInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    AuthGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
