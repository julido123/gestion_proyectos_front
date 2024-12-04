import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  @Input() isExpanded = true;
  @Output() closeSidebar = new EventEmitter<void>();

  menuItems = [
    { icon: 'home', label: 'Inicio', route: '/static/welcome' },
    { icon: 'add_circle', label: 'Crear Ideas', route: '/app/crear' },
    { icon: 'star_rate', label: 'Calificar Ideas', route: '/app/calificar', requiredUserType: 'ADMIN' },
    { icon: 'lightbulb', label: 'Ver Ideas', route: '/app/ideas' , requiredUserType: 'ADMIN'},
    { icon: 'leaderboard', label: 'Rankings', route: '/app/ranking' },
    { icon: 'insights', label: 'Estadísticas', route: '/app/estadisticas' , requiredUserType: 'ADMIN'}
  ];

  userType: string = ''; // El user_type actual

  constructor(public router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Suscribirse a los cambios en el usuario
    this.authService.currentUser.subscribe(user => {
      this.userType = user?.user_type || ''; // Actualiza el userType dinámicamente
    });
  }

  navigate(route: string): void {
    this.router.navigate([route]);
    this.closeSidebar.emit();
  }

  canAccessMenu(item: any): boolean {
    return !item.requiredUserType || item.requiredUserType === this.userType;
  }
}