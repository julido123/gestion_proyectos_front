import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  @Input() isExpanded = true;
  @Output() closeSidebar = new EventEmitter<void>();

  menuItems = [
    { icon: 'home', label: 'Inicio', route: '/static/welcome' },
    { icon: 'add_circle', label: 'Crear Ideas', route: '/app/crear' },
    { icon: 'lightbulb', label: 'Ver Ideas', route: '/app/ideas' },
    { icon: 'star_rate', label: 'Calificar Ideas', route: '/app/calificar' },
    { icon: 'leaderboard', label: 'Rankings', route: '/app/ranking' },
    { icon: 'insights', label: 'Estadísticas', route: '/app/estadisticas' }
  ];

  constructor(public router: Router) {}

  navigate(route: string) {
    this.router.navigate([route]);
    this.closeSidebar.emit();
  }
}
