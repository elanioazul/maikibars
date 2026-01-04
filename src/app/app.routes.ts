import { Routes } from '@angular/router';
export const routes: Routes = [
    {
        path: 'visor',
        loadComponent: () => import('./visor/visor').then(m => m.Visor),
    },
    {
      path: '',
      redirectTo: 'visor',
      pathMatch: 'full',
    }
  ];
