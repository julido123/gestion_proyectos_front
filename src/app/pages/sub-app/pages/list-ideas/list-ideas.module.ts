import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListIdeasRoutingModule } from './list-ideas-routing.module';
import { ListIdeasComponent } from './list-ideas.component';
import { ReactiveFormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [ListIdeasComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ListIdeasRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
  ]
})
export class ListIdeasModule { }
