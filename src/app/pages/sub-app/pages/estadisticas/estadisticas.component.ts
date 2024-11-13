import { Component, OnInit } from '@angular/core';
import { IdeaService } from '../../../../services/api/idea.service';
import { IdeasPorTipo, IdeasPorArea, IdeasPorSede, DetalleEncuestaPorSede } from '../../../../models/models';;


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
    });
  }

  obtenerIdeasPorArea(): void {
    this.ideaService.getIdeasPorArea().subscribe((data) => {
      this.ideasPorArea = data;
    });
  }

  obtenerIdeasPorSede(): void {
    this.ideaService.getIdeasPorSede().subscribe((data) => {
      this.ideasPorSede = data;
    });
  }

  obtenerDetalleEncuestasPorSede(): void {
    this.ideaService.getDetalleEncuestasPorSede().subscribe((data) => {
      this.detalleEncuestasPorSede = data;
    });
  }
}