import { CommonModule } from '@angular/common';
import { Component, OnInit, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { SidenavService } from '../../../shared/services/sidenav.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  drawer!: Signal<MatDrawer | null>;

  constructor(private sidenavService: SidenavService) {}


  ngOnInit(): void {
    this.drawer = this.sidenavService.getDrawer();
  }

}
