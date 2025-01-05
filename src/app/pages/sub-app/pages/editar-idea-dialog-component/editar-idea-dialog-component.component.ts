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
    { value: 'pendiente_ejecucion', label: 'Pendiente de Ejecución' },
    { value: 'en_ejecucion', label: 'En Ejecución' },
    { value: 'completada', label: 'Completada' },
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditarIdeaDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const estadoTransformado = this.transformarEstado(data.estado_ejecucion);
  
    this.ideaForm = this.fb.group({
      estado_ejecucion: [estadoTransformado], // Usar el valor transformado
      puntuacion_general: [data.calificaciones[0]?.puntuacion_general || null],
      factibilidad: [data.calificaciones[0]?.factibilidad || null],
      viabilidad: [data.calificaciones[0]?.viabilidad || null],
      impacto: [data.calificaciones[0]?.impacto || null],
      comentario: [data.calificaciones[0]?.comentario || ''],
    });
  }
  
  transformarEstado(estado_ejecucion: string): string {
    const mapping: { [key: string]: string } = {
      'Pendiente de Ejecución': 'pendiente_ejecucion',
      'En Ejecución': 'en_ejecucion',
      Completada: 'completada',
    };
  
    return mapping[estado_ejecucion] || estado_ejecucion; // Devuelve el valor transformado o el original si no está en el mapping
  }

  guardar(): void {
    if (this.ideaForm.valid) {
      const formData = this.ideaForm.value;

      // Crear un objeto con la estructura que deseas
      const dataToSend = {
        estado_ejecucion: formData.estado_ejecucion,
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