import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { CreateIdeaRoutingModule } from './create-idea-routing.module';
import { CreateIdeaComponent } from './create-idea.component';

@NgModule({
  declarations: [CreateIdeaComponent],
  imports: [
    CommonModule,
    CreateIdeaRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule
  ]
})
export class CreateIdeaModule { }
