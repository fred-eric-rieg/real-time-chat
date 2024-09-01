import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { SidenavService } from '../../shared/services/sidenav.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements AfterViewInit {
  showFiller = false;

  @ViewChild('drawer') drawer!: MatDrawer;

  

  constructor(private sidenavService: SidenavService) {}


  ngAfterViewInit(): void {
    this.sidenavService.setDrawer(this.drawer);
  }
  
}
