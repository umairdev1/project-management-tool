import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import {
  User,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  RefreshTokenRequest,
  MessageResponse,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private router = inject(Router);

  constructor(private http: HttpClient) {
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    const user = localStorage.getItem('currentUser');
    const token = localStorage.getItem('accessToken');

    if (user && token) {
      this.currentUserSubject.next(JSON.parse(user));
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/auth/login`, credentials)
      .pipe(tap((response) => this.handleAuthSuccess(response)));
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/auth/register`, userData)
      .pipe(tap((response) => this.handleAuthSuccess(response)));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);

    // Redirect to login page
    this.router.navigate(['/auth/login']);
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken = localStorage.getItem('refreshToken');
    const request: RefreshTokenRequest = { refreshToken: refreshToken! };
    return this.http.post<AuthResponse>(
      `${environment.apiUrl}/auth/refresh-token`,
      request
    );
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  isTokenExpired(): boolean {
    const token = this.getAccessToken();
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }

  private handleAuthSuccess(response: AuthResponse): void {
    localStorage.setItem('currentUser', JSON.stringify(response.user));
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);

    this.currentUserSubject.next(response.user);
    this.isAuthenticatedSubject.next(true);
  }
}
