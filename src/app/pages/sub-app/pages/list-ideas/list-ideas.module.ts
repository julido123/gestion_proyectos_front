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
import { MatCommonModule } from '@angular/material/core';
import { EditarIdeaDialogComponentComponent } from '../editar-idea-dialog-component/editar-idea-dialog-component.component';
import { MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ListIdeasComponent,
    EditarIdeaDialogComponentComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ListIdeasRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatCommonModule,
    MatDialogModule,
    FormsModule,
    MatIconModule
  ]
})
export class ListIdeasModule { }
