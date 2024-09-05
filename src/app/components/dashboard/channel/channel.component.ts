import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, SecurityContext, signal, Signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Channel, DataService, Member, Message, ShortMember } from '../../../shared/services/data.service';
import { MatCardModule } from '@angular/material/card';
import { QuillBubbleComponent } from "../quill-bubble/quill-bubble.component";
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { JoinChannelDirective } from '../../../shared/directives/join-channel.directive';
import { CreateChannelDirective } from '../../../shared/directives/create-channel.directive';
import { WriteDirectMessageDirective } from '../../../shared/directives/write-direct-message.directive';
import { DrawerComponent } from './drawer/drawer.component';


@Component({
  selector: 'app-channel',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule, MatMenuModule, MatCardModule, DrawerComponent, QuillBubbleComponent, JoinChannelDirective, CreateChannelDirective, WriteDirectMessageDirective],
  templateUrl: './channel.component.html',
  styleUrl: './channel.component.scss'
})
export class ChannelComponent {

  isDrawerExpanded: boolean = false;

  @ViewChild('messagesArea') messagesArea!: ElementRef;

  channel: Signal<Channel | null> = signal(null);
  directMessage: Signal<Channel[] | []> = signal([]);
  messages: Signal<Message[] | []> = signal([]);

  constructor(public dataService: DataService, private sanitizer: DomSanitizer, private router: Router) {};
  

  getSanitizedMessage(message: string) {
    return this.sanitizer.sanitize(SecurityContext.HTML, message);
  }


  scrollToLatestMessage(isMessageSent: boolean) {
    const element = this.messagesArea.nativeElement;
    if (isMessageSent) {
      // Needs delay to work, otherwise it seems the scroll happens before the DOM is updated with a new chat message!?
      setTimeout(() => {
        element.scrollTop = element.scrollHeight;
      }, 255);
    }
  }


  scroll() {
    const element = this.messagesArea.nativeElement;
    element.scrollTop = element.scrollHeight;
  }
}
