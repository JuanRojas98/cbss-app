import { Routes } from '@angular/router';
import {ListComponent} from "@modules/products/components/list/list.component";

export const productsRoutes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'categories',
    children: [
      {
        path: '',
        loadComponent: () => import('./categories/components/list/list.component').then( comp => comp.ListComponent )
      }
    ]
  }
  // {
  //   path: ':id',
  //   loadComponent: () => import('./components/form/form.component')
  // }
];
