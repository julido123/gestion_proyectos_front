import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RankingIdeaRoutingModule } from './ranking-idea-routing.module';
import { RankingIdeaComponent } from './ranking-idea.component';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [RankingIdeaComponent],
  imports: [
    CommonModule,
    RankingIdeaRoutingModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
    MatCardModule
  ]
})
export class RankingIdeaModule { }
