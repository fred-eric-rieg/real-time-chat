import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {

  constructor(private authService: AuthService, private router: Router) { }

  async canActivate(): Promise<boolean> {
    try {
      return true;
    } catch (error) {
      this.router.navigate(['login']);
      return false;
    }
    this.router.navigate(['login']);
    return false;
  }



  
}

