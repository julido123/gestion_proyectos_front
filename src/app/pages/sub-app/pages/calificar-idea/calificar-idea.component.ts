import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdeaService } from '../../../../services/api/idea.service';
import { Calificacion, Idea } from '../../../../models/models';

@Component({
  selector: 'app-calificar-idea',
  templateUrl: './calificar-idea.component.html',
  styleUrls: ['./calificar-idea.component.scss']
})
export class CalificarIdeaComponent implements OnInit {
  ideasSinCalificar: Idea[] = []; // Lista de ideas sin calificar
  selectedIdea : Idea | null = null; // Idea seleccionada para calificación

  // Inicialización del modelo de calificación
  calificacion: Calificacion = {
    idea: 0, // Se actualizará al seleccionar una idea
    factibilidad: 0,
    viabilidad: 0,
    impacto: 0,
    puntuacion_general: 0,
    comentario: '',
  };

  constructor(private ideaService: IdeaService) {}

  ngOnInit(): void {
    this.obtenerIdeasSinCalificar();
  }

  obtenerIdeasSinCalificar() {
    this.ideaService.getIdeasSinCalificar().subscribe((ideas: Idea[]) => {
      this.ideasSinCalificar = ideas;
    });
  }

  seleccionarIdea(idea: Idea) {
    // Si la idea seleccionada es la misma que la anterior, deselecciona para cerrar el cuadro
    if (this.selectedIdea?.id === idea.id) {
      this.selectedIdea = null;
    } else {
      this.selectedIdea = idea;
      this.calificacion.idea = idea.id; // Establece el ID de la idea seleccionada
    }
  }

  calificar() {
    if (this.selectedIdea) {
      this.ideaService.calificarIdea(this.calificacion).subscribe({
        next: (response) => {
          console.log("Calificación enviada:", response);
          // Resetea el formulario y la idea seleccionada si es necesario
          this.selectedIdea = null;
          this.calificacion = { idea: 0, factibilidad: 0, viabilidad: 0, impacto: 0, puntuacion_general: 0, comentario: '' };
          this.obtenerIdeasSinCalificar(); // Actualizar lista después de calificar
        },
        error: (error) => console.error("Error al calificar:", error)
      });
    }
  }
}