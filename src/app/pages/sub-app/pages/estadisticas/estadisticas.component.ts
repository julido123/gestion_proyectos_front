import { Component, OnInit } from '@angular/core';
import { IdeaService } from '../../../../services/api/idea.service';
import { IdeasPorTipo, IdeasPorArea, IdeasPorSede, DetalleEncuestaPorSede } from '../../../../models/models';;
import { ChartData, ChartOptions, ChartType  } from 'chart.js'; 
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.scss'
})
export class EstadisticasComponent implements OnInit {
  ideasPorTipo: IdeasPorTipo | null = null;
  ideasPorArea: IdeasPorArea | null = null;
  ideasPorSede: IdeasPorSede | null = null;
  detalleEncuestasPorSede: DetalleEncuestaPorSede[] = [];

  // Chart data and labels
  chartDataPorTipo: ChartData<'doughnut'> = { datasets: [] };
  chartLabelsPorTipo: string[] = [];
  chartDataPorArea: ChartData<'bar'> = { datasets: [] };
  chartLabelsPorArea: string[] = [];
  chartDataPorSede: ChartData<'bar'> = { datasets: [] };
  chartLabelsPorSede: string[] = [];

  constructor(private ideaService: IdeaService) {}

  ngOnInit(): void {
    this.obtenerIdeasPorTipo();
    this.obtenerIdeasPorArea();
    this.obtenerIdeasPorSede();
    this.obtenerDetalleEncuestasPorSede();
  }

  obtenerIdeasPorTipo(): void {
    this.ideaService.getIdeasPorTipo().subscribe((data) => {
      this.ideasPorTipo = data;

      this.chartLabelsPorTipo = ['Oportunidad', 'Problema', 'Reto'];
      this.chartDataPorTipo = {
        datasets: [{
          data: [
            data.por_tipo.oportunidad || 0,
            data.por_tipo.problema || 0,
            data.por_tipo.reto || 0
          ],
          backgroundColor: ['#4caf50', '#f44336', '#2196f3']
        }]
      };
    });
  }

  obtenerIdeasPorArea(): void {
    this.ideaService.getIdeasPorArea().subscribe((data) => {
      this.ideasPorArea = data;

      this.chartLabelsPorArea = Object.keys(data);
      const problemas = this.chartLabelsPorArea.map(area => data[area].problema);
      const oportunidades = this.chartLabelsPorArea.map(area => data[area].oportunidad);
      const retos = this.chartLabelsPorArea.map(area => data[area].reto);

      this.chartDataPorArea = {
        labels: this.chartLabelsPorArea,
        datasets: [
          { label: 'Problemas', data: problemas, backgroundColor: '#f44336' },
          { label: 'Oportunidades', data: oportunidades, backgroundColor: '#4caf50' },
          { label: 'Retos', data: retos, backgroundColor: '#2196f3' }
        ]
      };
    });
  }

  obtenerIdeasPorSede(): void {
    this.ideaService.getIdeasPorSede().subscribe((data) => {
      this.ideasPorSede = data;

      this.chartLabelsPorSede = Object.keys(data);
      const problemas = this.chartLabelsPorSede.map(sede => data[sede].problema);
      const oportunidades = this.chartLabelsPorSede.map(sede => data[sede].oportunidad);
      const retos = this.chartLabelsPorSede.map(sede => data[sede].reto);

      this.chartDataPorSede = {
        labels: this.chartLabelsPorSede,
        datasets: [
          { label: 'Problemas', data: problemas, backgroundColor: '#f44336' },
          { label: 'Oportunidades', data: oportunidades, backgroundColor: '#4caf50' },
          { label: 'Retos', data: retos, backgroundColor: '#2196f3' }
        ]
      };
    });
  }

  obtenerDetalleEncuestasPorSede(): void {
    this.ideaService.getDetalleEncuestasPorSede().subscribe((data) => {
      this.detalleEncuestasPorSede = data;
    });
  }

  displayedColumns: string[] = ['sede', 'totalIdeas', 'problemas', 'oportunidades', 'retos', 'promedioCalificacion'];
}