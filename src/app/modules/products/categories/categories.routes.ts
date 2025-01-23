import { Routes } from '@angular/router';
import {CreateComponent} from "@modules/products/categories/components/create/create.component";

export const categoriesRoutes: Routes = [
  {
    path: '',
    component: CreateComponent
  },
];
