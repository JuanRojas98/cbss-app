import {Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';

export const authRoutes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'CBSS - Login'
  }
];
