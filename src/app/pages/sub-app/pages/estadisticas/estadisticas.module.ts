import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstadisticasRoutingModule } from './estadisticas-routing.module';
import { EstadisticasComponent } from './estadisticas.component';
import { NgChartsModule } from 'ng2-charts';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';




@NgModule({
  declarations: [EstadisticasComponent],
  imports: [
    CommonModule,
    EstadisticasRoutingModule,
    NgChartsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class EstadisticasModule { }
