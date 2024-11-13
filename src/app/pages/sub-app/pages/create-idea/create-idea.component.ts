import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdeaService } from '../../../../services/api/idea.service';
import { Sede, Area } from '../../../../models/models';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-idea',
  templateUrl: './create-idea.component.html',
  styleUrl: './create-idea.component.scss'
})
export class CreateIdeaComponent implements OnInit {
  ideaForm !: FormGroup;
  sedes: Sede[] = [];
  areas: Area[] = [];

  constructor(private fb: FormBuilder, private ideaService: IdeaService) {}

  ngOnInit(): void {
    
    this.ideaForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(200)]],
      descripcion: ['', Validators.required],
      tipo: ['', Validators.required],
      sede: ['', Validators.required],
      area: ['', Validators.required],
    });
    this.getSede();
    this.getArea();
  }

  onSubmit(): void {
    if (this.ideaForm.valid) {
      console.log(this.ideaForm.value);
      this.ideaService.createIdea(this.ideaForm.value).subscribe({
        next: response => {  
          // Mostrar mensaje de éxito con SweetAlert2
          Swal.fire({
            title: '¡Éxito!',
            text: 'La idea ha sido creada exitosamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });  
          this.ideaForm.reset();
        },
        error: error => {   
          // Mostrar mensaje de error con SweetAlert2
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al crear la idea. Por favor, intenta nuevamente.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    } else {
      this.ideaForm.markAllAsTouched();
    }
  }


  getSede(): void {
    this.ideaService.getSede().subscribe(data =>{
      this.sedes = data;
    });
  }

  getArea(): void {
    this.ideaService.getArea().subscribe(data =>{
      this.areas = data;
    });
  }
}