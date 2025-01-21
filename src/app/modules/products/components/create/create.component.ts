import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "@models/user";

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  productForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    category_id: ['', [Validators.required]],
    brand_id: ['', [Validators.required]],
    quantity: ['', [Validators.required, Validators.minLength(1)]],
    price: ['', [Validators.required]]
  });

  onSubmit() {
    if (this.productForm.valid) {
      // const {email, password} = this.loginForm.getRawValue();
      // this.authService.login(email, password).subscribe(
      //   (res: User) => {
      //     this.authService.setAceessToken(res.accessToken);
      //     this.authService.setRefreshToken(res.refreshToken);
      //     this.authService.setUser(res)
      //
      //     this.router.navigate(['/admin']);
      //   },
      //   (err) => {
      //     alert('Error al iniciar sesión');
      //   }
      // );

      console.log(this.productForm.getRawValue());
    }
    else {
      this.productForm.markAllAsTouched();
    }
  }
}
