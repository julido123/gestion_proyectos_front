import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Calificacion, Idea, UserRanking, IdeasPorTipo, IdeasPorArea, IdeasPorSede, DetalleEncuestaPorSede} from '../../models/models';

@Injectable({
  providedIn: 'root'
})
export class IdeaService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getIdeas(filters?: { sede?: string; area?: string }): Observable<any> {
    let params = new HttpParams();
    if (filters) {
      if (filters.sede) {
        params = params.set('sede', filters.sede);
      }
      if (filters.area) {
        params = params.set('area', filters.area);
      }
    }
    return this.http.get(`${this.apiUrl}listar-ideas/`, { params });
  }

  createIdea(ideaData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}crear-idea/`, ideaData);
  }

  calificarIdea(ratingData: Calificacion): Observable<any> {
    return this.http.post(`${this.apiUrl}calificar-idea/`, ratingData);
  }

  getUserRanking(): Observable<UserRanking[]> {
    return this.http.get<UserRanking[]>(`${this.apiUrl}ranking-ideas/`);
  }

  getSede(): Observable<any> {
    return this.http.get(`${this.apiUrl}sedes/`);
  }

  getArea(): Observable<any> {
    return this.http.get(`${this.apiUrl}areas/`);
  }

  getIdeasSinCalificar(): Observable<any> {
    return this.http.get(`${this.apiUrl}ideas-sin-calificar/`);
  }

  getIdeasPorTipo(): Observable<IdeasPorTipo> {
    return this.http.get<IdeasPorTipo>(`${this.apiUrl}total-ideas-por-tipo/`);
  }

  getIdeasPorArea(): Observable<IdeasPorArea> {
    return this.http.get<IdeasPorArea>(`${this.apiUrl}ideas-por-area/`);
  }

  getIdeasPorSede(): Observable<IdeasPorSede> {
    return this.http.get<IdeasPorSede>(`${this.apiUrl}ideas-por-sede/`);
  }

  getDetalleEncuestasPorSede(): Observable<DetalleEncuestaPorSede[]> {
    return this.http.get<DetalleEncuestaPorSede[]>(`${this.apiUrl}detalle-encuestas-por-sede/`);
  }
}