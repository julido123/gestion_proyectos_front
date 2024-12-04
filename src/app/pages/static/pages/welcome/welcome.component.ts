import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent implements OnInit {
  userType: string = '';

  cards = [
    {
      icon: 'add_circle_outline',
      title: 'Crear Ideas',
      description: 'Crear una nueva idea',
      buttonText: 'Ir a crear',
      route: '/app/crear',
      btnClass: 'blue-btn',
      cardClass: 'card-crear-ideas'
    },
    {
      icon: 'star_outline',
      title: 'Calificar Ideas +',
      description: 'Evaluar ideas existentes',
      buttonText: 'Calificar',
      route: '/app/calificar',
      btnClass: 'orange-btn',
      cardClass: 'card-calificar-ideas',
      requiredUserType: 'ADMIN' // Solo accesible para admins
    },
    {
      icon: 'lightbulb_outline',
      title: 'Ver Ideas +',
      description: 'Explorar ideas existentes',
      buttonText: 'Ver ideas',
      route: '/app/ideas',
      btnClass: 'gray-btn',
      cardClass: 'card-ver-ideas',
      requiredUserType: 'ADMIN'
    },
    {
      icon: 'emoji_events',
      title: 'Ver Ranking',
      description: 'Explorar el ranking de ideas',
      buttonText: 'Ver ranking',
      route: '/app/ranking',
      btnClass: 'green-btn',
      cardClass: 'card-ver-ranking'
    },
    {
      icon: 'insights',
      title: 'Ver Estadísticas',
      description: 'Analizar datos de ideas',
      buttonText: 'Ver estadísticas',
      route: '/app/estadisticas',
      btnClass: 'light-gray-btn',
      cardClass: 'card-ver-estadisticas',
      requiredUserType: 'ADMIN'
    }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Suscribirse al usuario actual para obtener el userType
    this.authService.currentUser.subscribe(user => {
      this.userType = user?.user_type || '';
    });
  }

  canAccessCard(card: any): boolean {
    // Verifica si el usuario tiene acceso a la tarjeta
    return !card.requiredUserType || card.requiredUserType === this.userType;
  }
}