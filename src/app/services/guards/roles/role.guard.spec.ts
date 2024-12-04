import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RoleGuard } from './role.guard';
import { AuthService } from '../../auth/auth.service';
import { BehaviorSubject } from 'rxjs';

describe('RoleGuard', () => {
  let guard: RoleGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const currentUserSubject = new BehaviorSubject<any>({ user_type: 'ADMIN' }); // Mock del usuario actual

    const authServiceSpy = jasmine.createSpyObj('AuthService', [], {
      currentUserSubject,
      currentUserValue: { user_type: 'ADMIN' }, // Mock inicial
    });

    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        RoleGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    guard = TestBed.inject(RoleGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if the user has the required role', () => {
    const routeMock: any = { data: { roles: ['ADMIN'] } };
    const stateMock: any = {};
    const result = guard.canActivate(routeMock, stateMock);
    expect(result).toBeTrue();
  });

  it('should navigate to /access-denied if the user does not have the required role', () => {
    // Usa el nuevo método para actualizar el usuario actual
    authService.updateCurrentUser({ user_type: 'EMPLOYEE' });
  
    const routeMock: any = { data: { roles: ['ADMIN'] } };
    const stateMock: any = {};
    const result = guard.canActivate(routeMock, stateMock);
    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/static/not-found']);
  });
});
