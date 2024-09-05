import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'createChannel',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './create-channel.component.html',
  styleUrl: './create-channel.component.scss'
})
export class CreateChannelComponent {

  constructor(public dialogRef: MatDialogRef<CreateChannelComponent>) {}

}
