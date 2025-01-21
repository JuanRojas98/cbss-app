import { Routes } from '@angular/router';
import {CreateComponent} from "@modules/products/components/create/create.component";

export const productsRoutes: Routes = [
  {
    path: '',
    component: CreateComponent
  },
  // {
  //   path: ':id',
  //   loadComponent: () => import('./components/form/form.component')
  // }
];
