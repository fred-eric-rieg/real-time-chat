import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2, Signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Channel, DataService, Member, Message } from '../../shared/services/data.service';
import { MatCardModule } from '@angular/material/card';
import { QuillBubbleComponent } from "../quill-bubble/quill-bubble.component";


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule, MatMenuModule, MatCardModule, QuillBubbleComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {

  @ViewChild('leftmenu') leftmenu!: ElementRef;
  @ViewChild('content') content!: ElementRef;

  isShrunk = false;

  channel!: Signal<Channel>;
  channels!: Signal<Channel[]>;

  directMessage!: Signal<Channel[]>;
  directMessages!: Signal<Channel[]>;

  messages!: Signal<Message[]>;

  showChannels = false;
  showDMs = false;

  user!: Signal<Member>;

  constructor(private renderer: Renderer2, public dataService: DataService) {

  };


  ngOnInit(): void {
    this.dataService.fetchUser();
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


  returnChatpartner(members: Member[]) {
    const currentUser = this.user();
    return members.find(members => members.id === currentUser.id)?.fullName || "Unknown";
  }
  
}
