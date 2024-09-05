import { CommonModule } from '@angular/common';
import { Component, Signal, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Channel } from '../../../shared/services/data.service';

@Component({
  selector: 'app-join-channel',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatInputModule, CommonModule],
  templateUrl: './join-channel.component.html',
  styleUrl: './join-channel.component.scss'
})
export class JoinChannelComponent {

  channelForm = new FormGroup({
    name: new FormControl('', [Validators.required])
  });

  channels: Signal<Channel[]> = signal([ {id: 0, name: "unset", created: new Date(), members: [], description: "nothing", createdBy: {fullName: "no", id: 0, image: ""} } ]);

  constructor(public dialogRef: MatDialogRef<JoinChannelComponent>) {}


  joinChannel() {
    console.log(this.channelForm.value);
    this.dialogRef.close();
  }

}
