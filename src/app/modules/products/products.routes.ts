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
    path: 'brands',
    children: [
      {
        path: 'create',
        loadComponent: () => import('./brands/components/create/create.component').then( comp => comp.CreateComponent )
      }
    ]
  }
  // {
  //   path: ':id',
  //   loadComponent: () => import('./components/form/form.component')
  // }
];
