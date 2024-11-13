import { Component, OnInit } from '@angular/core';
import { IdeaService } from '../../../../services/api/idea.service';
import {UserRanking } from '../../../../models/models';

@Component({
  selector: 'app-ranking-idea',
  templateUrl: './ranking-idea.component.html',
  styleUrl: './ranking-idea.component.scss'
})
export class RankingIdeaComponent implements OnInit {
  rankings: UserRanking[] = [];
  displayedColumns: string[] = ['position', 'username', 'total_ideas', 'promedio_calificacion'];

  constructor(private ideaService: IdeaService) {}

  ngOnInit(): void {
    this.ideaService.getUserRanking().subscribe(
      (data) => {
        this.rankings = data;
      },
      (error) => {
        console.error('Error loading rankings:', error);
      }
    );
  }
}