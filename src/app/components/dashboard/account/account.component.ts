import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Member, MemberService } from '../../../shared/services/member.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [HeaderComponent, SidenavComponent, MatButtonModule, CommonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {
  isEditing = false;

  user = signal<Member | null>(null);

  temporaryImg = this.user()?.image;

  @ViewChild('fileInput') fileInput!: HTMLInputElement;

  constructor(private memberService: MemberService) {}


  async ngOnInit(): Promise<void> {
    this.user = this.memberService.getUser();
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Handle the file upload logic here
      console.log('Selected file:', file);
      this.temporaryImg = file.name;
    }
  }


  updateProfile() {
    this.isEditing = !this.isEditing;
  }
}
