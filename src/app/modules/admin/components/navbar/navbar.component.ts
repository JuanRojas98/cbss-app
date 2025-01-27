import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "@services/auth.service";
import {ShiftService} from "@services/shift.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  private authService = inject(AuthService);
  private shiftService = inject(ShiftService);

  shiftStatus = false;
  startDate?: string;
  user = JSON.parse(<string>this.authService.getUser());
  currentShift = JSON.parse(<string>this.shiftService.getCurrentShift());

  ngOnInit() {
    if (this.currentShift) {
      this.shiftStatus = true;
      this.startDate = this.currentShift.startDate;
    }
  }

  startShift() {
    this.shiftService.startShift({user_id: this.user.id}).subscribe(
      (data: any) => {
        this.shiftStatus = true;
        this.startDate = data.shift.startDate;
        this.currentShift = data.shift;
        this.shiftService.startedShift(data.shift);
      }
    )
  }

  closeShift() {
    this.shiftService.endShift(this.currentShift.id, {user_id: this.user.id}).subscribe(
      (res: any) => {
        this.shiftStatus = false;
        this.shiftService.endedShift();
      }
    );
  }

  logout() {
    this.authService.logout();
  }
}
