import { Routes } from '@angular/router';

export const routes: Routes = [
  // Default redirect to login page
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },

  // Public routes - accessible without authentication
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },

  // Protected routes - require authentication
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then(
        (m) => m.DASHBOARD_ROUTES
      ),
  },

  // Catch all - redirect to login
  {
    path: '**',
    redirectTo: '/auth/login',
  },
];
