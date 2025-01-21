import { Component } from '@angular/core';
import {SidebarComponent} from "@modules/admin/components/sidebar/sidebar.component";
import {NavbarComponent} from "@modules/admin/components/navbar/navbar.component";
import {FooterComponent} from "@modules/admin/components/footer/footer.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    RouterOutlet
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
