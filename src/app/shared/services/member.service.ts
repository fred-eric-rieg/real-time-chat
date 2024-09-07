import { Injectable } from '@angular/core';
import { getDatabase, ref, set } from '@angular/fire/database';

export interface Member {
  fullName: string,
  id: number,
  image: string,
  email: string,
}


@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor() { }


  setNewUser(userId: string, fullName: string, email: string, image: string) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      fullName: fullName,
      email: email,
      image: image
    });
  }




}
