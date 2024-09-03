import { Component } from '@angular/core';
import { MainComponent } from './components/dashboard/main/main.component';
import { HeaderComponent } from './components/dashboard/header/header.component';
import { SidenavComponent } from './components/dashboard/sidenav/sidenav.component';
import { QuillBubbleComponent } from './components/dashboard/quill-bubble/quill-bubble.component';
import { QuillEditorComponent } from 'ngx-quill';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainComponent, HeaderComponent, SidenavComponent, QuillEditorComponent, QuillBubbleComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'real-time-chat';
}
