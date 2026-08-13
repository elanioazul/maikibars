import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { Visor } from '@visor/visor';
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, title: 'Sign in' },
  {
    path: 'visor',
    component: Visor,
    title: 'Visor',
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '/login' },
];
