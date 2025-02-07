import {Routes} from "@angular/router";

export const salesRoutes: Routes = [
  {
    path: '',
    redirectTo: 'map',
    pathMatch: 'full'
  },
  {
    path: 'map',
    loadComponent: () => import('./components/map/map.component').then((comp) => comp.MapComponent)
  }
];
