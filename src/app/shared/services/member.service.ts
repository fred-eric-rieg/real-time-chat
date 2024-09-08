import { Injectable, signal } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { get, getDatabase, onValue, ref as ref_database, set } from '@angular/fire/database';
import { getDownloadURL, getStorage, ref as ref_storage, uploadBytes } from '@angular/fire/storage';

export interface Member {
  fullName: string,
  id: string,
  image: string,
  email: string,
}


@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private member = signal<Member | null>(null);

  constructor() { }

  /**
   * Create a new user in firebase auth and a default profile image uploaded to storage and a user object refernce in the RTD.
   * @param userId as sting.
   * @param fullName as sting.
   * @param email as sting.
   */
  async setNewUser(userId: string, fullName: string, email: string) {
    const db = getDatabase();
    const storage = getStorage();

    const profileImagePath = 'default.jpg';
    const file = await fetch(profileImagePath).then(res => res.blob()); // Converting file to blob

    const storageRef = ref_storage(storage, `${userId}/default.jpg`);
    await uploadBytes(storageRef, file);

    const imageUrl = await getDownloadURL(storageRef);

    set(ref_database(db, 'users/' + userId), {
      fullName: fullName,
      email: email,
      image: imageUrl
    });
  }


  async fetchUser(): Promise<void> {
    const uid = getAuth().currentUser?.uid
    const db = getDatabase();
    const user = ref_database(db, 'users/' + uid);
    onValue(user, (snapshot) => {
      const data: Member = snapshot.val();
      this.member.set(data);
    });
  }

  getUser() {
    return this.member
  }
}
