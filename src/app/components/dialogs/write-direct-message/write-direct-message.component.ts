import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'writeDirectMessage',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './write-direct-message.component.html',
  styleUrl: './write-direct-message.component.scss'
})
export class WriteDirectMessageComponent {

  constructor(public dialogRef: MatDialogRef<WriteDirectMessageComponent>) {}

}
