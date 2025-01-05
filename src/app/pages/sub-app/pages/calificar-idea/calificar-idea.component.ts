import { Component, OnInit } from '@angular/core';
import { IdeaService } from '../../../../services/api/idea.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { Sede, Area, Idea } from '../../../../models/models';
import { MatDialog } from '@angular/material/dialog';
import { CalificacionDialogComponent } from '../calificacion-dialog/calificacion-dialog.component';
import Swal from 'sweetalert2';
import { ImageCarouselDialogComponent } from '../image-carousel-dialog/image-carousel-dialog.component';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FileService } from '../../../../services/shared/file.service';
import { Router } from '@angular/router';


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
  isUserEncargado !: boolean;
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
    private authService: AuthService,
    public dialog: MatDialog,
    private http: HttpClient,
    private fb: FormBuilder,
    private fileService: FileService,
    private router: Router,
  ) { }

  tableColumns: string[] = [
    'fecha_creacion', 'usuario', 'titulo', 'descripcion', 'tipo', 'sede', 
    'estado_revision', 'archivos', 'acciones'
  ];

  ngOnInit(): void {
    this.ideaForm = this.fb.group({
      sede: [''],
      area: [''],
      usuario: ['']
    });

    this.isUserEncargado = this.authService.isUserEncargado();
    if (!this.isUserEncargado) {
      this.tableColumns.splice(5, 0, 'area');
    }
  
    this.getSede();
    this.getArea();
    this.obtenerIdeasSinCalificar();
  }

  // ngOnInit(): void {
  //   // Suscribirse al usuario actual para obtener el userType
  //   this.authService.currentUser.subscribe(user => {
  //     this.userType = user?.user_type || '';
  //   });
  // }

  obtenerIdeasSinCalificar() {
    const filters = this.ideaForm.value;
    const hayFiltrosAplicados = Object.values(filters).some(valor => valor !== '');
  
    this.ideaService.getIdeasSinCalificar(filters).subscribe(
      (ideas: any[]) => {
        console.log('Respuesta del servidor:', ideas);
        this.ideasSinCalificar = ideas;
  
        if (!hayFiltrosAplicados && ideas.length === 0) {
          let timerInterval: any;
          Swal.fire({
            title: "No hay ideas pendientes de calificación",
            html: "Serás redirigido a la sección de ideas ya calificadas en <b></b> milisegundos.",
            timer: 5000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading(Swal.getConfirmButton());
              const timer = Swal.getPopup()?.querySelector("b");
              timerInterval = setInterval(() => {
                if (timer) {
                  timer.textContent = `${Swal.getTimerLeft()}`;
                }
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            }
          }).then(() => {
            // Redirigir a la sección de ideas ya calificadas
            this.router.navigate(['/app/ideas']);
          });
        } else if (ideas.length > 0) {
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
        // Mostrar mensaje de éxito con SweetAlert2
        Swal.fire({
          title: '¡Calificación enviada!',
          text: 'La idea ha sido calificada exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            // Solo actualizar la lista después de cerrar el cuadro de diálogo
            this.obtenerIdeasSinCalificar();
          }
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