import { Component, OnInit } from '@angular/core';
import { IdeaService } from '../../../../services/api/idea.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Sede, Area, Idea } from '../../../../models/models';


@Component({
  selector: 'app-list-ideas',
  templateUrl: './list-ideas.component.html',
  styleUrl: './list-ideas.component.scss'
})
export class ListIdeasComponent implements OnInit {
  ideaForm!: FormGroup;
  sedes: Sede[] = [];
  areas: Area[] = [];
  ideas: Idea[] = [];
  displayedColumns: string[] = ['titulo', 'descripcion', 'usuario', 'tipo', 'sede', 'area', 'estado'];

  constructor(private fb: FormBuilder, private ideaService: IdeaService) {}

  ngOnInit(): void {
    this.ideaForm = this.fb.group({
      sede: [''],
      area: ['']
    });

    this.getSede();
    this.getArea();
    this.getIdeas();
  }

  getSede(): void {
    this.ideaService.getSede().subscribe(data => {
      this.sedes = data;
    });
  }

  getArea(): void {
    this.ideaService.getArea().subscribe(data => {
      this.areas = data;
    });
  }

  getIdeas(): void {
    const filters = this.ideaForm.value;
    this.ideaService.getIdeas(filters).subscribe(data => {
      this.ideas = data;
    });
  }

}