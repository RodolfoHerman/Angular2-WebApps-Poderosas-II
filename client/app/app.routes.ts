import { RouterModule, Routes } from '@angular/router';
import { ListagemComponent } from './listagem/listagem.component';
import { CadastroComponent } from './cadastro/cadastro.component';

const appRoutes: Routes  = [
  { path: '', component: ListagemComponent },
  { path: 'cadastro', component: CadastroComponent },
  //Roata parametrizada, o :id funciona como curinga
  { path: 'cadastro/:id', component: CadastroComponent },
  { path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);