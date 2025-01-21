import {Routes} from '@angular/router';
import {adminRoutes} from "@modules/admin/admin.routes";
import {authRoutes} from "@modules/auth/auth.routes";
import {authGuard} from "@guards/auth.guard";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.routes').then(m => m.authRoutes)
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadChildren: () => import('./modules/admin/admin.routes').then(m => m.adminRoutes)
  },
  {
    path: '**',
    redirectTo: '/auth/login',
  }
];
