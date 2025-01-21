import {Routes} from '@angular/router';
import {LayoutComponent} from "./components/layout/layout.component";

export const adminRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [

    ]
  }
]
