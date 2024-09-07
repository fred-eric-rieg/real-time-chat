import { inject, Injectable } from '@angular/core';

import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from '@angular/fire/auth';
import { MemberService } from './member.service';
import { FirebaseStorage } from '@angular/fire/storage';
import { FirebaseApp } from '@angular/fire/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  app: FirebaseApp = inject(FirebaseApp)

  constructor(private memberService: MemberService) { }


  async create(email: string, password: string, fullName: string) {
    const auth = getAuth(this.app);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Created
        const user = userCredential.user;
        this.memberService.setNewUser(user.uid, fullName, email, "");
        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }


  async login(email: string, password: string) {
    const auth = getAuth(this.app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
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
