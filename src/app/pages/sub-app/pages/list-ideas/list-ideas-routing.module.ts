import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListIdeasComponent } from './list-ideas.component';

const routes: Routes = [
  {
    path:'',
    component: ListIdeasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListIdeasRoutingModule { }
