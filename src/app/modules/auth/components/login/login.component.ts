import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, Validators, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {AuthService} from "@services/auth.service";
import {User} from "@models/user";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AlertService} from "@services/alert.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  showSpinner = false;

  loginForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  ngOnInit() {
      if (this.authService.getAceessToken()) {
          this.router.navigate(['admin']);
      }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const {email, password} = this.loginForm.getRawValue();
      this.authService.login(email, password).subscribe(
        (res: User) => {
          this.authService.setAceessToken(res.accessToken);
          this.authService.setRefreshToken(res.refreshToken);
          this.authService.setUser(res)

          this.router.navigate(['/admin']);
        },
        (err) => {
          alert('Error al iniciar sesión');
        }
      );
    }
    else {
      this.loginForm.markAllAsTouched();
    }
  }
}
