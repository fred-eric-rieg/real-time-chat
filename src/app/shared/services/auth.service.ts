import { inject, Injectable, signal } from '@angular/core';

import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, User } from '@angular/fire/auth';
import { MemberService } from './member.service';
import { FirebaseStorage } from '@angular/fire/storage';
import { FirebaseApp } from '@angular/fire/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = signal<User | null>(null)

  app: FirebaseApp = inject(FirebaseApp);

  constructor(private memberService: MemberService) { }


  async create(email: string, password: string, fullName: string) {
    const auth = getAuth(this.app);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Created
        const user = userCredential.user;
        this.memberService.setNewUser(user.uid, fullName, email);
        return true;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return false;
      });
  }


  async login(email: string, password: string): Promise<boolean> {
    const auth = getAuth(this.app);
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        this.user.set(userCredential.user);
        return true;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return false;
      });
  }


  async logout() {
    const auth = getAuth(this.app);
    return signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

}
