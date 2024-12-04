import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdeaService } from '../../../../services/api/idea.service';
import { Sede, Area } from '../../../../models/models';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-idea',
  templateUrl: './create-idea.component.html',
  styleUrl: './create-idea.component.scss'
})
export class CreateIdeaComponent implements OnInit {
  ideaForm !: FormGroup;
  sedes: Sede[] = [];
  areas: Area[] = [];

  selectedFiles : File[] = [];

  constructor(private fb: FormBuilder, private ideaService: IdeaService) { }

  ngOnInit(): void {

    this.ideaForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(200)]],
      descripcion: ['', Validators.required],
      tipo: ['', Validators.required],
      sede: ['', Validators.required],
      area: ['', Validators.required],
    });
    this.getSede();
    this.getArea();
  }

  onSubmit(): void {
    if (this.ideaForm.valid) {
      const formData = new FormData();
  
      // Agregar datos del formulario al FormData
      Object.keys(this.ideaForm.value).forEach(key => {
        formData.append(key, this.ideaForm.value[key]);
      });
  
      // Agregar todos los archivos seleccionados al FormData
      this.selectedFiles.forEach(file => {
        formData.append('archivos[]', file); // Cambiar a `archivos[]` si el backend lo requiere
      });

      formData.forEach((value, key) => {
        console.log(key, value);
      });
      //console.log(formData); // Mostrar campos y valores (archivos serán objetos Blob)
      
  
      this.ideaService.createIdea(formData).subscribe({
        next: response => {
          Swal.fire({
            title: '¡Éxito!',
            text: 'La idea ha sido creada exitosamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
          this.ideaForm.reset();
          this.selectedFiles = []; // Restablecer los archivos seleccionados
        },
        error: error => {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al crear la idea. Por favor, intenta nuevamente.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        },
      });
    } else {
      this.ideaForm.reset();
    }
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput?.files) {
      const files = Array.from(fileInput.files);
      const maxFiles = 3;
      const maxFileSizeMB = 5;
      const maxFileSizeBytes = maxFileSizeMB * 1024 * 1024;
      const allowedTypes = [
        'image/jpeg', 'image/png', 'image/gif',
        'application/pdf', 'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/plain', 'text/csv'
      ];
  
      if (files.length > maxFiles) {
        Swal.fire('Demasiados archivos', `Solo puedes subir hasta ${maxFiles} archivos.`, 'error');
        return;
      }
  
      // Filtrar archivos inválidos
      const invalidFiles = files.filter(file => {
        return !allowedTypes.includes(file.type) || file.size > maxFileSizeBytes;
      });
  
      if (invalidFiles.length > 0) {
        Swal.fire({
          title: 'Archivos inválidos',
          text: `Algunos archivos no cumplen las restricciones. Por favor verifica los formatos y tamaños.`,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
        return;
      }
  
      this.selectedFiles = files; // Guardar solo los archivos válidos
    }
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
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
}