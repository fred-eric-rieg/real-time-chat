import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Member, MemberService } from '../../../shared/services/member.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [HeaderComponent, SidenavComponent, MatButtonModule, CommonModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {
  isEditing = false;

  user = signal<Member | null>(null);

  temporaryImg!: File;

  @ViewChild('fileInput') fileInput!: HTMLInputElement;

  accountForm!: FormGroup;

  constructor(private memberService: MemberService) {
    
  }


  async ngOnInit(): Promise<void> {
    this.user = this.memberService.getUser();
  }


  ngAfterViewInit() {
    this.accountForm = new FormGroup({
      fullName: new FormControl(this.user()?.fullName, [Validators.required]),
      email: new FormControl(this.user()?.email, [Validators.required, Validators.email]),
      image: new FormControl(null)
    });
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Handle the file upload logic here
      console.log('Selected file:', file);
      this.temporaryImg = file;
    }
  }


  updateProfile() {
    this.isEditing = !this.isEditing;
    if (this.accountForm.valid) {
      // Todo Update Profile Service.
      // Case: no File selected
    }
  }
}
