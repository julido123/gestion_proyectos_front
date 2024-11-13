import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateIdeaComponent } from './create-idea.component';

const routes: Routes = [
  {
    path:'',
    component: CreateIdeaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateIdeaRoutingModule { }
