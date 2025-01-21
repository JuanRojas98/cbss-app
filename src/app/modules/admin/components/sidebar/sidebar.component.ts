import { Component } from '@angular/core';
import {HeaderComponent} from "@modules/admin/components/sidebar/header/header.component";
import {FooterComponent} from "@modules/admin/components/sidebar/footer/footer.component";
import {NavComponent} from "@modules/admin/components/sidebar/nav/nav.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    NavComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

}
