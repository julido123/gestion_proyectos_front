import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service'; // Asegúrate de la ruta correcta

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  isAuthenticated: boolean = false; // Indica si el usuario está autenticado

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Suscribirse al estado del usuario
    this.authService.currentUser.subscribe(user => {
      this.isAuthenticated = !!user?.token; // Autenticado si hay token
    });
  }

  logout(): void {
    this.authService.logout();
  }
}