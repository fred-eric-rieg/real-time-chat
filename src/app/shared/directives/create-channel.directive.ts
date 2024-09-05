import { Directive, HostListener, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateChannelComponent } from '../../components/dialogs/create-channel/create-channel.component';

@Directive({
  selector: '[createChannel]',
  standalone: true
})
export class CreateChannelDirective {

  dialog = inject(MatDialog);

  @HostListener('click', ['$event'])
  openDialog($event: MouseEvent) {
    this.dialog.open(CreateChannelComponent, {
        width: '300px',
        height: 'fit-content',
    });
  }

  constructor() { }

}
