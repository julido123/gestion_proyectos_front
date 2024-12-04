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

  getIdeas(filters?: { sede?: string; area?: string; usuario?: string }): Observable<any> {
    let params = new HttpParams();
    
    if (filters) {
      if (filters.sede) {
        params = params.set('sede', filters.sede);
      }
      if (filters.area) {
        params = params.set('area', filters.area);
      }
      if (filters.usuario) {
        params = params.set('usuario', filters.usuario);
      }
    }
  
    return this.http.get(`${this.apiUrl}listar-ideas/`, { params });
  }

  createIdea(ideaData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}crear-idea/`, ideaData);
  }

  calificarIdea(ratingData: Calificacion): Observable<any> {
    return this.http.post(`${this.apiUrl}calificar-idea/`, ratingData);
  }

  getUserRanking(period: string = 'all'): Observable<UserRanking[]> {
    const params = new HttpParams().set('period', period); // Configura correctamente los parámetros
    return this.http.get<UserRanking[]>(`${this.apiUrl}ranking-ideas/`, { params });
  }

  getSede(): Observable<any> {
    return this.http.get(`${this.apiUrl}sedes/`);
  }

  getArea(): Observable<any> {
    return this.http.get(`${this.apiUrl}areas/`);
  }

  getIdeasSinCalificar(filters?: { sede?: string; area?: string; usuario?: string }): Observable<any> {
    let params = new HttpParams(); // Inicia un nuevo objeto HttpParams
  
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params = params.append(key, value); // Asegúrate de usar append para cada filtro
        }
      });
    }
    console.log('Request Filters:', filters);
  
    return this.http.get(`${this.apiUrl}ideas-sin-calificar/`, { params });
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

  updateIdeaEstado(id: number, estado: string) {
    return this.http.patch(`${this.apiUrl}ideas/${id}/estado/`, { estado });
  }

  updateCalificacion(id: number, calificacion: any) {
    return this.http.patch(`${this.apiUrl}calificaciones/${id}/`, calificacion);
  }

//http://localhost:8000/api/propuesta/media/uploads/julian_fff_-_copia_2_41093.png
  getArchivoUrl(ruta: string): string {
    return `${this.apiUrl}media/${ruta}`;
  }

  getUserInfo(): Observable<any> {
    return this.http.get(`${this.apiUrl}perfil/`);
  }

}