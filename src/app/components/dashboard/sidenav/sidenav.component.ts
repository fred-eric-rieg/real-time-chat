import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit, signal, Signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { SidenavService } from '../../../shared/services/sidenav.service';
import { Channel, DataService, ShortMember } from '../../../shared/services/data.service';
import { Router } from '@angular/router';
import { JoinChannelDirective } from '../../../shared/directives/join-channel.directive';
import { CreateChannelDirective } from '../../../shared/directives/create-channel.directive';
import { WriteDirectMessageDirective } from '../../../shared/directives/write-direct-message.directive';
import { Member, MemberService } from '../../../shared/services/member.service';
import { AuthService } from '../../../shared/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, CommonModule, JoinChannelDirective, CreateChannelDirective, WriteDirectMessageDirective],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements AfterViewInit, OnInit {
  private _snackBar = inject(MatSnackBar);
  showFiller = false;

  @ViewChild('drawer') drawer!: MatDrawer;

  showChannels = false;
  showDMs = false;

  channel: Signal<Channel | null> = signal(null);
  channels: Signal<Channel[] | []> = signal([]);

  directMessage: Signal<Channel[]> = signal([]);;
  directMessages: Signal<Channel[]> = signal([]);;

  user: Signal<Member | null> = signal(null);


  constructor(private sidenavService: SidenavService, private dataService: DataService, private router: Router, private memberService: MemberService, private authService: AuthService) { }


  ngOnInit(): void {
    this.user = this.memberService.getUser();
  }


  ngAfterViewInit(): void {
    this.sidenavService.setDrawer(this.drawer);
  }


  switchToChannel(channel: Channel) {
    this.dataService.setCurrentChannel(channel);
    this.dataService.fetchMessages(channel.id);
    this.drawer.toggle();
    this.router.navigate(["/dashboard/channel/" + channel.id]);
  }


  returnChatpartner(members: ShortMember[]) {
    const currentUser = this.user();
    return members.find(members => members.id === currentUser?.id)?.fullName || "Unknown";
  }


  logout() {
    this.authService.logout().then( () => {
      this.router.navigate(["/login"]);
    }).catch((error) => {
      this.openSnackBar("Error while logging out.", "Mkay", {duration: 5000});
    });
  }


  goToAccount() {
    this.drawer.toggle();
    this.router.navigate(["dashboard/account"]);
  }


  openSnackBar(message: string, action: string, arg2: { duration: number; }) {
    this._snackBar.open(message, action, arg2);
  }
}
