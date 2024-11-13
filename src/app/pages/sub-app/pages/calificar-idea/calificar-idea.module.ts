import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

// Importaciones de Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';

import { CalificarIdeaRoutingModule } from './calificar-idea-routing.module';
import { FormsModule } from '@angular/forms';
import { CalificarIdeaComponent } from './calificar-idea.component';


@NgModule({
  declarations: [CalificarIdeaComponent],
  imports: [
    CommonModule,
    CalificarIdeaRoutingModule,
    FormsModule,
    ReactiveFormsModule,   // Para formularios reactivos
    MatCardModule,         // Para usar mat-card
    MatButtonModule,       // Para usar mat-raised-button
    MatExpansionModule,    // Para usar mat-expansion-panel
    MatInputModule 
  ]
})
export class CalificarIdeaModule { }
