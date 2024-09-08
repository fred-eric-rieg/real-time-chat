import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule, MatFormFieldModule, ReactiveFormsModule, FormsModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {

  private _snackBar = inject(MatSnackBar);

  loginForm!: FormGroup;

  routeSub!: Subscription;

  hide = signal(true);


  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }


  ngOnInit(): void {
    this.routeSub = this.route.queryParams.subscribe(params => {
      let emailSnackbar = params['emailSnackbar'];
      if (emailSnackbar) {
        this.openSnackBar("Check your emails before first login.", "Mkay", {duration: 5000});
      }
    });
  }


  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }


  async login() {
    try {
      let resp = await this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
      if (resp === true) {
        this.router.navigate(["/dashboard/channel/0"]);
      } else {
        this.openSnackBar("Invalid login credentials.", "Damn", {duration: 5000});
      }
    } catch(error) {
      this.openSnackBar("Error.", "Damn", {duration: 5000});
    }
  }


  goToSignup() {
    this.router.navigate(["/signup"])
  }


  openSnackBar(message: string, action: string, arg2: { duration: number; }) {
    this._snackBar.open(message, action, arg2);
  }

}
