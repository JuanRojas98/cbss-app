import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SpinnerService} from "@shared/services/spinner.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {}
