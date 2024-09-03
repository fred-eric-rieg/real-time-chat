import { Component, OnInit, Signal } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { DataService, Member } from '../../../shared/services/data.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [HeaderComponent, SidenavComponent, MatButtonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {

  user!: Signal<Member>;

  constructor(private dataService: DataService) {}


  ngOnInit(): void {
    this.dataService.fetchUser();
    this.dataService.fetchChannels();
    this.dataService.fetchContacts();
    this.dataService.fetchDirectMessages();
    this.user = this.dataService.getUser();
  }

}
