import { Component, Signal, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ShortMember } from '../../../shared/services/data.service';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Member } from '../../../shared/services/member.service';

@Component({
  selector: 'createChannel',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatInputModule, CommonModule],
  templateUrl: './create-channel.component.html',
  styleUrl: './create-channel.component.scss'
})
export class CreateChannelComponent {

  user: Signal<Member | null> = signal({ fullName: "Hans Dieter", id: "abz", image: "profile8.jpg", email: "hansi@mail.de" });

  members: Signal<ShortMember[]> = signal([{ fullName: "Hans Dieter", id: "abc", image: "profile8.jpg" }, { fullName: "Klausi Mayer", id: "def", image: "profile8.jpg" },]);

  channelForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    members: new FormControl([{ fullName: this.user()?.fullName, id: this.user()?.id, image: this.user()?.image }], [Validators.required]),
    description: new FormControl('', [Validators.required])
  });


  constructor(public dialogRef: MatDialogRef<CreateChannelComponent>) {}

  
  ngOnInit(): void {
    
  }


  createChannel() {
    console.log(this.channelForm.value);
    this.dialogRef.close();
  }

}
