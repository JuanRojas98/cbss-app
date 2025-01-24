import {Component, inject} from '@angular/core';
import {AuthService} from "@services/auth.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private authService = inject(AuthService);

  shiftStatus = false;

  startShift() {
    this.shiftStatus = true;
  }

  closeShift() {
    this.shiftStatus = false;
  }

  logout() {
    this.authService.logout();
  }
}
