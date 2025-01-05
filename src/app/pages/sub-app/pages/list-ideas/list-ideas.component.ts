import { Component, OnInit } from '@angular/core';
import { IdeaService } from '../../../../services/api/idea.service';
import { AuthService } from '../../../../services/auth/auth.service'; 
import { FormBuilder, FormGroup } from '@angular/forms';
import { Sede, Area, Idea } from '../../../../models/models';
import { EditarIdeaDialogComponentComponent } from '../editar-idea-dialog-component/editar-idea-dialog-component.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ImageCarouselDialogComponent } from '../image-carousel-dialog/image-carousel-dialog.component';
import { FileService } from '../../../../services/shared/file.service';


@Component({
  selector: 'app-list-ideas',
  templateUrl: './list-ideas.component.html',
  styleUrl: './list-ideas.component.scss'
})
export class ListIdeasComponent implements OnInit {
  ideaForm!: FormGroup;
  sedes: Sede[] = [];
  areas: Area[] = [];
  ideas: Idea[] = [];
  isUserEncargado !: boolean;
  tableColumns: string[] = [
    'fecha_creacion', 'usuario', 'titulo', 'descripcion', 'sede',
    'estado_revision', 'estado_ejecucion','calificacion_encargado', 'calificacion_gerente',
    'calificacion_definitiva', 'archivos', 'acciones'
  ];

  constructor(private fb: FormBuilder, private authService: AuthService, private ideaService: IdeaService, private dialog: MatDialog, private fileService: FileService) { }

  ngOnInit(): void {
    this.ideaForm = this.fb.group({
      sede: [''],
      area: [''],
      usuario: ['']
    });

    this.isUserEncargado = this.authService.isUserEncargado();
    if (!this.isUserEncargado) {
      this.tableColumns.splice(5, 0, 'area'); // Inserta 'area' en la posición deseada
    }

    this.getSede();
    this.getArea();
    this.getIdeas();
  }

  getSede(): void {
    this.ideaService.getSede().subscribe(data => {
      this.sedes = data;
    });
  }

  getArea(): void {
    this.ideaService.getArea().subscribe(data => {
      this.areas = data;
    });
  }

  getIdeas(): void {
    const filters = this.ideaForm.value;
    this.ideaService.getIdeas(filters).subscribe(data => {
      this.ideas = data;
    });
  }

  clearFilters(): void {
    this.ideaForm.reset();
    this.getIdeas();
  }

  seleccionarIdea(idea: any): void {
    const dialogRef = this.dialog.open(EditarIdeaDialogComponentComponent, {
      width: '400px',
      data: idea // Pasar la idea seleccionada al diálogo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Extraer estado y calificación del resultado del diálogo
        const { estado, calificacion } = result;

        // Llamar al método para actualizar estado y calificación
        this.actualizarIdea(idea, estado, calificacion);
      }
    });
  }

  actualizarIdea(idea: any, estado: string, calificacion: any): void {
    const ideaId = idea.id;
    const calificacionId = idea.calificaciones[0]?.id; // Obtener el ID de la primera calificación asociada

    if (!calificacionId) {
      Swal.fire({
        title: 'Error',
        text: 'No se encontró la calificación asociada a esta idea.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }


    // Actualizar el estado de la idea
    this.ideaService.updateIdeaEstado(ideaId, estado).subscribe({
      next: () => {
        // Si el estado se actualiza correctamente, actualizar la calificación
        this.ideaService.updateCalificacion(calificacionId, calificacion).subscribe({
          next: () => {
            this.getIdeas();
            Swal.fire({
              title: '¡Actualización completa!',
              text: 'El estado de la idea y su calificación han sido actualizados exitosamente.',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
          },
          error: (error) => {
            console.error('Error al actualizar la calificación:', error);
            Swal.fire({
              title: 'Error al actualizar la calificación',
              text: 'No se pudo actualizar la calificación. Por favor, inténtalo de nuevo.',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        });
      },
      error: (error) => {
        console.error('Error al actualizar el estado de la idea:', error);
        Swal.fire({
          title: 'Error al actualizar el estado',
          text: 'No se pudo actualizar el estado de la idea. Por favor, inténtalo de nuevo.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  getPuntuacionGeneral(element: any, tipo: string): string {
    const calificacion = element.calificaciones.find((c: any) => c.tipo === tipo);
    return calificacion?.puntuacion_general || 'N/A';
  }

  async verArchivos(archivos: any[]): Promise<void> {
    if (!archivos || archivos.length === 0) {
      await Swal.fire({
        title: 'Sin archivos',
        text: 'No hay archivos asociados a esta idea.',
        icon: 'info',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    const { images: imagenes, otherFiles: otrosArchivos } = this.fileService.procesarArchivos(
      archivos,
      (url) => this.ideaService.getArchivoUrl(url)
    );

    this.dialog.open(ImageCarouselDialogComponent, {
      width: '600px',
      data: { images: imagenes, otherFiles: otrosArchivos },
    });
  }
}