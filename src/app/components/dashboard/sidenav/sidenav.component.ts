import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, Signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { SidenavService } from '../../../shared/services/sidenav.service';
import { Channel, DataService, Member, ShortMember } from '../../../shared/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements AfterViewInit, OnInit {
  showFiller = false;

  @ViewChild('drawer') drawer!: MatDrawer;

  showChannels = false;
  showDMs = false;

  channel!: Signal<Channel>;
  channels!: Signal<Channel[]>;

  directMessage!: Signal<Channel[]>;
  directMessages!: Signal<Channel[]>;

  user!: Signal<Member>;
  

  constructor(private sidenavService: SidenavService, private dataService: DataService, private router: Router) {}


  ngOnInit(): void {
    this.user = this.dataService.getUser();
    this.channel = this.dataService.getCurrentChannel();
    this.channels = this.dataService.getAllChannels();
    this.directMessages = this.dataService.getAllDirectMessages();
  }


  ngAfterViewInit(): void {
    this.sidenavService.setDrawer(this.drawer);
  }


  switchToChannel(channel: Channel) {
    this.dataService.setCurrentChannel(channel);
    this.dataService.fetchMessages(channel.id);
    this.drawer.toggle();
    this.router.navigate(["/dashboard/channel"]);
  }


  returnChatpartner(members: ShortMember[]) {
    const currentUser = this.user();
    return members.find(members => members.id === currentUser.id)?.fullName || "Unknown";
  }
  

  logout() {
    this.router.navigate(["/login"]);
  }

  goToAccount() {
    this.drawer.toggle();
    this.router.navigate(["dashboard/account"]);
  }
}
