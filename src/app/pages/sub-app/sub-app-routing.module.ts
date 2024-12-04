import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '../../services/guards/roles/role.guard';

const routes: Routes = [
  {
    // Ruta al componente de Calificar
    path:'calificar',
    loadChildren: () => import('./pages/calificar-idea/calificar-idea.module').then(m => m.CalificarIdeaModule), canActivate: [RoleGuard], data: { roles: ['ADMIN'] } 
  },
  {
    // Ruta al componente de módulos
    path:'crear',
    loadChildren: () => import('./pages/create-idea/create-idea.module').then(m => m.CreateIdeaModule)
  },
  {
    // Ruta al componente de módulos-info
    path:'estadisticas',
    loadChildren: () => import('./pages/estadisticas/estadisticas.module').then(m => m.EstadisticasModule), canActivate: [RoleGuard], data: { roles: ['ADMIN'] } 
  },
  {
    // Ruta al componente de ingreso-orden
    path:'ideas',
    loadChildren: () => import('./pages/list-ideas/list-ideas.module').then(m => m.ListIdeasModule), canActivate: [RoleGuard], data: { roles: ['ADMIN'] } 
  },
  {
    // Ruta al componente de módulos
    path:'perfil',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    // Ruta al componente de produccion - referencia
    path:'ranking',
    loadChildren: () => import('./pages/ranking-idea/ranking-idea.module').then(m => m.RankingIdeaModule)
  },
  
  {
    path:'**',
    pathMatch: 'full',
    redirectTo: 'ideas'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubAppRoutingModule { }
