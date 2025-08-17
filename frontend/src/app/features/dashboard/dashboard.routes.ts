import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { BacklogComponent } from './components/backlog/backlog.component';
import { BoardComponent } from './components/board/board.component';
import { authGuard } from '../../core/guards/auth.guard';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        loadComponent: () =>
          import('./components/overview/overview.component').then(
            (m) => m.OverviewComponent
          ),
        canActivate: [authGuard],
      },
      {
        path: 'backlog',
        component: BacklogComponent,
        canActivate: [authGuard],
      },
      {
        path: 'board',
        component: BoardComponent,
        canActivate: [authGuard],
      },
    ],
  },
];
