import { Component, OnInit } from '@angular/core';
import { IdeaService } from '../../../../services/api/idea.service';
import { Sede, Area, Idea } from '../../../../models/models';
import { MatDialog } from '@angular/material/dialog';
import { CalificacionDialogComponent } from '../calificacion-dialog/calificacion-dialog.component';
import Swal from 'sweetalert2';
import { ImageCarouselDialogComponent } from '../image-carousel-dialog/image-carousel-dialog.component';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FileService } from '../../../../services/shared/file.service';


@Component({
  selector: 'app-calificar-idea',
  templateUrl: './calificar-idea.component.html',
  styleUrls: ['./calificar-idea.component.scss']
})
export class CalificarIdeaComponent implements OnInit {
  ideasSinCalificar: Idea[] = [];
  selectedIdea: Idea | null = null;
  displayedColumns: string[] = [];
  sedes: Sede[] = [];
  areas: Area[] = [];
  ideaForm!: FormGroup;
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
    public dialog: MatDialog,
    private http: HttpClient,
    private fb: FormBuilder,
    private fileService: FileService
  ) { }

  ngOnInit(): void {
    this.ideaForm = this.fb.group({
      sede: [''],
      area: [''],
      usuario: ['']
    });
  
    this.getSede();
    this.getArea();
    this.obtenerIdeasSinCalificar();
  }

  obtenerIdeasSinCalificar() {
    const filters = this.ideaForm.value;
    console.log('Filtros aplicados:', filters);
  
    this.ideaService.getIdeasSinCalificar(filters).subscribe(
      (ideas: any[]) => {
        console.log('Respuesta del servidor:', ideas);
        this.ideasSinCalificar = ideas;
  
        if (ideas.length > 0) {
          const columnasBase = Object.keys(ideas[0]).filter(
            (key) => key !== 'acciones' && key !== 'id'
          );
          this.displayedColumns = [...columnasBase, 'acciones'];
        }
      },
      (error) => {
        console.error('Error al obtener ideas sin calificar:', error);
      }
    );
  }
  
  clearFilters(): void {
    this.ideaForm.reset({
      sede: '',
      area: '',
      usuario: ''
    });
    this.obtenerIdeasSinCalificar();
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