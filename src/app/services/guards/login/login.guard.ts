import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service'; // Ajusta la ruta si es necesario

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      // Si el usuario ya está autenticado, redirige a static/welcome
      this.router.navigate(['/static/welcome']);
      return false; // Bloquea el acceso a la página de login
    }
    return true; // Permite acceso si no está autenticado
  }
}
