import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  showFiller = false;
}
