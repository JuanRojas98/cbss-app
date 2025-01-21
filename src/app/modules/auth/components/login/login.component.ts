import {Component, inject} from '@angular/core';
import {FormBuilder, Validators, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  showPassword = false;

  loginForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.getRawValue());
      alert('Entro!!');
    }
    else {
      this.loginForm.markAllAsTouched();
      console.log('Error');
    }
  }
}
