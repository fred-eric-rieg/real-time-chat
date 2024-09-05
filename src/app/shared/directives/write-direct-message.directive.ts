import { Directive, HostListener, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WriteDirectMessageComponent } from '../../components/dialogs/write-direct-message/write-direct-message.component';

@Directive({
  selector: '[writeDirectMessage]',
  standalone: true
})
export class WriteDirectMessageDirective {

  dialog = inject(MatDialog);

  @HostListener('click', ['$event'])
  openDialog($event: MouseEvent) {
    this.dialog.open(WriteDirectMessageComponent, {
        width: '300px',
        height: 'fit-content',
    });
  }

  constructor() { }

}
