import { Routes } from '@angular/router';
import {CreateComponent} from "@modules/products/components/create/create.component";
import {ListComponent} from "@modules/products/components/list/list.component";

export const productsRoutes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'create',
    component: CreateComponent
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
