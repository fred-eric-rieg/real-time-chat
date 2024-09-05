import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatButtonModule, FormsModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    fullName: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
    repeat: new FormControl('', [Validators.required])
  }, { validators: [this.passwordsMatchValidator] });


  constructor(private router: Router) {}


  passwordsMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password1 = form.get("password")?.value;
    const password2 = form.get("repeat")?.value;

    const noMatch = password1 !== password2;

    if ((password1 && password2) && noMatch) {
      return { nomatch: true };
    }
    return null;
  }


  signup() {
    this.router.navigate(["/login"], { queryParams: { emailSnackbar: true }});
  }


  returnToLogin() {
    this.router.navigate(["/login"]);
  }
}
