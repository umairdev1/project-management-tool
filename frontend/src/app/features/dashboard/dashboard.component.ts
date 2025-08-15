import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
})
export class DashboardComponent {
  private authService = inject(AuthService);

  currentUser$ = this.authService.currentUser$;
  isAuthenticated$ = this.authService.isAuthenticated$;

  logout(): void {
    this.authService.logout();
  }
}
