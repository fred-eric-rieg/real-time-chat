import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2, SecurityContext, Signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Channel, DataService, Member, Message, ShortMember } from '../../../shared/services/data.service';
import { MatCardModule } from '@angular/material/card';
import { QuillBubbleComponent } from "../quill-bubble/quill-bubble.component";
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-channel',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule, MatMenuModule, MatCardModule, QuillBubbleComponent],
  templateUrl: './channel.component.html',
  styleUrl: './channel.component.scss'
})
export class ChannelComponent implements OnInit {

  @ViewChild('leftmenu') leftmenu!: ElementRef;
  @ViewChild('content') content!: ElementRef;
  @ViewChild('messagesArea') messagesArea!: ElementRef;

  isShrunk = false;

  channel!: Signal<Channel>;
  channels!: Signal<Channel[]>;

  directMessage!: Signal<Channel[]>;
  directMessages!: Signal<Channel[]>;

  messages!: Signal<Message[]>;

  showChannels = false;
  showDMs = false;

  user!: Signal<Member>;

  constructor(private renderer: Renderer2, public dataService: DataService, private sanitizer: DomSanitizer) {

  };


  ngOnInit(): void {
    this.dataService.fetchUser();
    this.dataService.fetchContacts();
    this.dataService.fetchChannels();
    this.dataService.fetchDirectMessages();
    this.dataService.fetchMessages(1);
    this.user = this.dataService.getUser();
    this.channel = this.dataService.getCurrentChannel();
    this.channels = this.dataService.getAllChannels();
    this.directMessages = this.dataService.getAllDirectMessages();
    this.messages = this.dataService.getMessages();
  }


  toggleLeftMenu() {
    const leftMenuEl = this.leftmenu.nativeElement;
    const contentEl = this.content.nativeElement;
    if (leftMenuEl.classList.contains('shrink')) {
      this.renderer.addClass(contentEl, 'hide-overflow');
      this.renderer.removeClass(leftMenuEl, 'shrink');
      this.isShrunk = false;
    } else {
      this.renderer.removeClass(contentEl, 'hide-overflow');
      this.renderer.addClass(leftMenuEl, 'shrink');
      this.isShrunk = true;
    }
  }


  switchToChannel(channel: Channel) {
    this.dataService.setCurrentChannel(channel);
    this.dataService.fetchMessages(channel.id);
  }


  returnChatpartner(members: ShortMember[]) {
    const currentUser = this.user();
    return members.find(members => members.id === currentUser.id)?.fullName || "Unknown";
  }


  getSanitizedMessage(message: string) {
    return this.sanitizer.sanitize(SecurityContext.HTML, message);
  }

  scrollToLatestMessage(isMessageSent: boolean) {
    const element = this.messagesArea.nativeElement;
    if (isMessageSent) {
      // Needs delay to work, otherwise it seems the scroll happens before the DOM is updated with a new chat message!?
      setTimeout( () => {
        element.scrollTop = element.scrollHeight;
      }, 255);
    }
  }

  scroll() {
    const element = this.messagesArea.nativeElement;
    element.scrollTop = element.scrollHeight;
  }
}
