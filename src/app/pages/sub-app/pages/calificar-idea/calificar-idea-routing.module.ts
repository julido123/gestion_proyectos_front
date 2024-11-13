import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalificarIdeaComponent } from './calificar-idea.component';

const routes: Routes = [
  {
    path:'',
    component: CalificarIdeaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalificarIdeaRoutingModule { }
