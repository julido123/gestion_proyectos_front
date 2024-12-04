import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Idea, Calificacion } from '../../../../models/models';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-editar-idea-dialog-component',
  templateUrl: './editar-idea-dialog-component.component.html',
  styleUrl: './editar-idea-dialog-component.component.scss'
})
export class EditarIdeaDialogComponentComponent {
  ideaForm: FormGroup;

  estados = [
    { value: 'pendiente', label: 'Pendiente' },
    { value: 'aprobada', label: 'Aprobada' },
    { value: 'en_progreso', label: 'En Progreso' },
    { value: 'completada', label: 'Completada' },
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditarIdeaDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const estadoTransformado = this.transformarEstado(data.estado);
  
    this.ideaForm = this.fb.group({
      estado: [estadoTransformado], // Usar el valor transformado
      puntuacion_general: [data.calificaciones[0]?.puntuacion_general || null],
      factibilidad: [data.calificaciones[0]?.factibilidad || null],
      viabilidad: [data.calificaciones[0]?.viabilidad || null],
      impacto: [data.calificaciones[0]?.impacto || null],
      comentario: [data.calificaciones[0]?.comentario || ''],
    });
  }
  
  transformarEstado(estado: string): string {
    const mapping: { [key: string]: string } = {
      Pendiente: 'pendiente',
      Aprobada: 'aprobada',
      'En Progreso': 'en_progreso',
      Completada: 'completada',
    };
  
    return mapping[estado] || estado; // Devuelve el valor transformado o el original si no está en el mapping
  }

  guardar(): void {
    if (this.ideaForm.valid) {
      const formData = this.ideaForm.value;

      // Crear un objeto con la estructura que deseas
      const dataToSend = {
        estado: formData.estado,
        calificacion: {
          factibilidad: formData.factibilidad,
          viabilidad: formData.viabilidad,
          impacto: formData.impacto,
          puntuacion_general: formData.puntuacion_general,
          comentario: formData.comentario
        }
      };

      // Ahora envías el objeto con la estructura correcta al componente padre
      this.dialogRef.close(dataToSend); // Devuelve los datos organizados al componente que llamó el diálogo
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}