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
  selectedPeriod: string = 'all'; // Período seleccionado por defecto

  constructor(private ideaService: IdeaService) {}

  ngOnInit(): void {
    this.loadRankings(); 
  }

  loadRankings(): void {
    this.ideaService.getUserRanking(this.selectedPeriod).subscribe(
      (data) => {
        this.rankings = data;
      },
      (error) => {
        console.error('Error loading rankings:', error);
      }
    );
  }

  onPeriodChange(period: string): void {
    this.selectedPeriod = period;
    this.loadRankings(); // Recargar rankings cuando se cambia el período
  }
}