import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-calificacion-dialog',
  templateUrl: './calificacion-dialog.component.html',
  styleUrl: './calificacion-dialog.component.scss'
})
export class CalificacionDialogComponent {
  calificacion = {
    factibilidad: 0,
    viabilidad: 0,
    impacto: 0,
    puntuacion_general: 0,
    comentario: ''
  };

  constructor(
    public dialogRef: MatDialogRef<CalificacionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  calificar() {
    //console.log('Calificación enviada:', this.calificacion);
    this.dialogRef.close(this.calificacion);
  }
}
