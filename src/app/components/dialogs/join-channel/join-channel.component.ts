import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-join-channel',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './join-channel.component.html',
  styleUrl: './join-channel.component.scss'
})
export class JoinChannelComponent {

  constructor(public dialogRef: MatDialogRef<JoinChannelComponent>) {}

}
