import { Component, OnInit } from '@angular/core';
import { IdeaService } from '../../../../services/api/idea.service';
import { Calificacion, Idea } from '../../../../models/models';
import { MatDialog } from '@angular/material/dialog';
import { CalificacionDialogComponent } from '../calificacion-dialog/calificacion-dialog.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-calificar-idea',
  templateUrl: './calificar-idea.component.html',
  styleUrls: ['./calificar-idea.component.scss']
})
export class CalificarIdeaComponent implements OnInit {
  ideasSinCalificar: Idea[] = [];
  selectedIdea: Idea | null = null;
  displayedColumns: string[] = [];
  calificacion = {
    idea: 0,
    factibilidad: 0,
    viabilidad: 0,
    impacto: 0,
    puntuacion_general: 0,
    comentario: '',
  };

  constructor(
    private ideaService: IdeaService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.obtenerIdeasSinCalificar();
  }

  obtenerIdeasSinCalificar() {
    this.ideaService.getIdeasSinCalificar().subscribe((ideas: any[]) => {
      this.ideasSinCalificar = ideas;
      if (ideas.length > 0) {
        // Obtén las columnas dinámicamente de las claves del primer objeto
        this.displayedColumns = Object.keys(ideas[0]).filter(
          (key) => key !== 'acciones' // Excluir claves si es necesario
        );
        // Agrega la columna de acciones
        this.displayedColumns.push('acciones');
      }
    });
  }

  seleccionarIdea(idea: any): void {
    const dialogRef = this.dialog.open(CalificacionDialogComponent, {
      width: '400px',
      data: idea // Pasar la idea seleccionada al diálogo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const calificacion = {
          ...result,
          idea: idea.id
        };
        this.calificar(calificacion);
      }
    });
  }

  calificar(calificacion: any): void {
    this.ideaService.calificarIdea(calificacion).subscribe({
      next: () => {
        this.obtenerIdeasSinCalificar(); // Actualizar la lista de ideas

        // Mostrar mensaje de éxito con SweetAlert2
        Swal.fire({
          title: '¡Calificación enviada!',
          text: 'La idea ha sido calificada exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      },
      error: (error) => {
        console.error('Error al calificar:', error);

        // Mostrar mensaje de error con SweetAlert2
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un problema al calificar la idea.',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo'
        });
      }
    });
  }
}