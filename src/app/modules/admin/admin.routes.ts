import {Routes} from '@angular/router';
import {LayoutComponent} from "./components/layout/layout.component";
import {productsRoutes} from "@modules/products/products.routes";

export const adminRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
      },
      {
        path: 'products',
        loadChildren: () => import('./../products/products.routes').then(m => m.productsRoutes),
        title: 'CBSS - Productos'
      }
    ]
  }
]
