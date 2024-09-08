import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseApp } from '@angular/fire/app';
import { getAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {

  app: FirebaseApp = inject(FirebaseApp);


  constructor(private router: Router) { }

  async canActivate(): Promise<boolean> {
    const auth = getAuth();
    try {
      if (auth.currentUser) {
        return true;
      }
      else {
        this.router.navigate(['login']);
        return false;
      }
    } catch (error) {
      this.router.navigate(['login']);
      return false;
    }
  }



  
}

