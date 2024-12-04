import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Obtén el userType del usuario autenticado
    const userType = this.authService.userType;

    // Obtén el rol requerido desde los datos de la ruta
    const requiredRoles: string[] = route.data['roles'];

    if (userType && requiredRoles && requiredRoles.includes(userType)) {
      return true; // Si el usuario tiene el rol requerido, permite el acceso
    } else {
      // Redirige a una página de acceso denegado o al inicio
      this.router.navigate(['/staic/not-found']);
      return false; // Bloquea el acceso
    }
  }
}
