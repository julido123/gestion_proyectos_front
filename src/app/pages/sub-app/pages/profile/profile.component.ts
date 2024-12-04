import { Component } from '@angular/core';
import { IdeaService } from '../../../../services/api/idea.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user: any = {}; // Datos del usuario

  constructor(private ideaService: IdeaService) {}

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    this.ideaService.getUserInfo().subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Error al cargar la información del usuario:', error);
      }
    );
  }
}
