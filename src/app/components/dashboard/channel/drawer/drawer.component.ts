import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, signal, Signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Channel, DataService, ShortMember } from '../../../../shared/services/data.service';
import { Router } from '@angular/router';
import { JoinChannelDirective } from '../../../../shared/directives/join-channel.directive';
import { CreateChannelDirective } from '../../../../shared/directives/create-channel.directive';
import { WriteDirectMessageDirective } from '../../../../shared/directives/write-direct-message.directive';
import { Member } from '../../../../shared/services/member.service';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule, JoinChannelDirective, CreateChannelDirective, WriteDirectMessageDirective],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss'
})
export class DrawerComponent {

  channels: Signal<Channel[] | []> = signal([]);
  directMessages: Signal<Channel[] | []> = signal([]);
  user!: Signal<Member>;

  @ViewChild('leftmenu') leftmenu!: ElementRef;

  isShrunk = false;
  showChannels = false;
  showDMs = false;

  constructor(private renderer: Renderer2, private router: Router, private dataService: DataService) {}


  toggleLeftMenu() {
    const leftMenuEl = this.leftmenu.nativeElement;
    if (leftMenuEl.classList.contains('shrink')) {
      this.renderer.removeClass(leftMenuEl, 'shrink');
      this.isShrunk = false;
    } else {
      this.renderer.addClass(leftMenuEl, 'shrink');
      this.isShrunk = true;
    }
  }


  switchToChannel(channel: Channel) {
    this.dataService.setCurrentChannel(channel);
    this.dataService.fetchMessages(channel.id);
    this.router.navigate(["/dashboard/channel/" + channel.id]);
  }


  returnChatpartner(members: ShortMember[]) {
    const currentUser = this.user();
    return members.find(members => members.id === currentUser.id)?.fullName || "Unknown";
  }


}
