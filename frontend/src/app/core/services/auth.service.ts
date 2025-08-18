import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

export interface User {
  id: string;
  name: string;
  email: string;
  initials: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    const user = this.getStoredUser();
    const token = this.getStoredToken();

    if (user && token) {
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    } else {
      this.clearAuthData();
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    // For demo purposes, simulate API call
    return of({
      success: true,
      message: 'Login successful',
      user: {
        id: '1',
        name: credentials.email.split('@')[0],
        email: credentials.email,
        initials: credentials.email.split('@')[0].substring(0, 2).toUpperCase(),
      },
      token: 'demo-token-' + Date.now(),
    });
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    // For demo purposes, simulate API call
    return of({
      success: true,
      message: 'Registration successful',
      user: {
        id: '1',
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        initials:
          userData.firstName.substring(0, 1).toUpperCase() +
          userData.lastName.substring(0, 1).toUpperCase(),
      },
      token: 'demo-token-' + Date.now(),
    });
  }

  handleAuthSuccess(response: AuthResponse): void {
    // Store user data and token
    localStorage.setItem('currentUser', JSON.stringify(response.user));
    localStorage.setItem('authToken', response.token);

    // Update authentication state
    this.currentUserSubject.next(response.user);
    this.isAuthenticatedSubject.next(true);
  }

  logout(): void {
    this.clearAuthData();
    this.router.navigate(['/auth/login']);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  private getStoredUser(): User | null {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }

  private getStoredToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private clearAuthData(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }
}
