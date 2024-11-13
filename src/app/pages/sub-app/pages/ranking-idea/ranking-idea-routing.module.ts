import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RankingIdeaComponent } from './ranking-idea.component';

const routes: Routes = [
  {
    path:'',
    component: RankingIdeaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RankingIdeaRoutingModule { }
