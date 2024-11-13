import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    // Ruta al componente de Calificar
    path:'calificar',
    loadChildren: () => import('./pages/calificar-idea/calificar-idea.module').then(m => m.CalificarIdeaModule)
  },
  {
    // Ruta al componente de módulos
    path:'crear',
    loadChildren: () => import('./pages/create-idea/create-idea.module').then(m => m.CreateIdeaModule)
  },
  {
    // Ruta al componente de módulos-info
    path:'estadisticas',
    loadChildren: () => import('./pages/estadisticas/estadisticas.module').then(m => m.EstadisticasModule)
  },
  {
    // Ruta al componente de ingreso-orden
    path:'ideas',
    loadChildren: () => import('./pages/list-ideas/list-ideas.module').then(m => m.ListIdeasModule)
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
