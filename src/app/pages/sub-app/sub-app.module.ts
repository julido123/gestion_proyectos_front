import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubAppRoutingModule } from './sub-app-routing.module';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';


@NgModule({
  declarations: [
    EstadisticasComponent
  ],
  imports: [
    CommonModule,
    SubAppRoutingModule
  ]
})
export class SubAppModule { }
