import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = environment.authUrl;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('currentUser_Creativos');
    let parsedUser = null;

    try {
      parsedUser = storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.error('Error parsing currentUser from localStorage', e);
    }

    this.currentUserSubject = new BehaviorSubject<any>(parsedUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.authUrl, { username, password })
      .pipe(map(user => {
        if (user && user.token && user.token.access) {
          const userWithAccessToken = {
            ...user,
            token: user.token.access,
            user_type: user.user_type // Incluye el user_type
          };
          localStorage.setItem('currentUser_Creativos', JSON.stringify(userWithAccessToken));
          this.currentUserSubject.next(userWithAccessToken);
        }
        return user;
      }));
  }

  logout(): void {
    localStorage.removeItem('currentUser_Creativos');
    localStorage.removeItem('userType');
    this.currentUserSubject.next(null);
    this.router.navigate(['auth/login']);
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  public get userType(): string | null {
    return this.currentUserValue?.user_type || null;
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue?.token;
  }

  updateCurrentUser(user: any): void {
    this.currentUserSubject.next(user);
  }
}
