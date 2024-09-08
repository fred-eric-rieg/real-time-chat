import { Component, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatButtonModule, FormsModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  signupForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    fullName: new FormControl(null, [Validators.required]),
    password: new FormControl(null, Validators.required),
    repeat: new FormControl(null, [Validators.required])
  }, { validators: [this.passwordsMatchValidator] });


  hide = signal(true);


  constructor(private router: Router, private authService: AuthService) { }


  passwordsMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password1 = form.get("password")?.value;
    const password2 = form.get("repeat")?.value;

    const noMatch = password1 !== password2;

    if ((password1 && password2) && noMatch) {
      return { nomatch: true };
    }
    return null;
  }


  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }


  async signup() {
    const user = this.signupForm.value;
    if (user.email && user.password && user.fullName) {
      let resp = await this.authService.create(user.email, user.password, user.fullName);
      if (resp) {
        this.router.navigate(["/login"], { queryParams: { emailSnackbar: true } });
      } else {
        console.log("Errooooorrrr");
      }
    }
  }


  returnToLogin() {
    this.router.navigate(["/login"]);
  }
}
