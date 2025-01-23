import { Component } from '@angular/core';
import {SidebarComponent} from "@modules/admin/components/sidebar/sidebar.component";
import {NavbarComponent} from "@modules/admin/components/navbar/navbar.component";
import {FooterComponent} from "@modules/admin/components/footer/footer.component";
import {RouterOutlet} from "@angular/router";
import {SpinnerService} from "@services/spinner.service";
import {SpinnerComponent} from "../../../../shared/spinner/spinner.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    RouterOutlet,
    SpinnerComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  showSpinner = false;

  constructor(private spinnerService: SpinnerService) {
    this.spinnerService.spinner$.subscribe((data: boolean) => {
      setTimeout(() => {
        this.showSpinner = data ? data : false;
      });
    });
  }
}
