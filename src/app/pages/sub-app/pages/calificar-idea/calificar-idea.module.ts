import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

// Importaciones de Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { CalificarIdeaRoutingModule } from './calificar-idea-routing.module';
import { FormsModule } from '@angular/forms';
import { CalificarIdeaComponent } from './calificar-idea.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { CalificacionDialogComponent } from '../calificacion-dialog/calificacion-dialog.component';


@NgModule({
  declarations: [CalificarIdeaComponent,
    CalificacionDialogComponent
  ],
  imports: [
    CommonModule,
    CalificarIdeaRoutingModule,
    FormsModule,
    ReactiveFormsModule,   // Para formularios reactivos
    MatCardModule,         // Para usar mat-card
    MatButtonModule,       // Para usar mat-raised-button
    MatExpansionModule,    // Para usar mat-expansion-panel
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatDialogModule
  ]
})
export class CalificarIdeaModule { }
