import { Component, OnInit } from '@angular/core';
import { IdeaService } from '../../../../services/api/idea.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user: any = {}; // Datos del usuario
  isLoading: boolean = true; // Indica si los datos están cargando

  constructor(private ideaService: IdeaService) {}

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    this.ideaService.getUserInfo().subscribe(
      (data) => {
        this.user = data;
        this.isLoading = false; // Cambiar el estado una vez que los datos se carguen
      },
      (error) => {
        console.error('Error al cargar la información del usuario:', error);
        this.isLoading = false; // Detener el spinner aunque ocurra un error
      }
    );
  }
}