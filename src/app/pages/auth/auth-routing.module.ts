import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../../services/guards/login/login.guard';

const routes: Routes = [
  {
    path:'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule), canActivate: [LoginGuard]
  },
  {
    path:'**',
    pathMatch: 'full',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
