import { Directive, HostListener, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JoinChannelComponent } from '../../components/dialogs/join-channel/join-channel.component';

@Directive({
  selector: '[joinChannel]',
  standalone: true
})
export class JoinChannelDirective {

  dialog = inject(MatDialog);

  @HostListener('click', ['$event'])
  openDialog($event: MouseEvent) {
    this.dialog.open(JoinChannelComponent, {
        width: '300px',
        height: 'fit-content',
    });
  }

  constructor() { }


}
