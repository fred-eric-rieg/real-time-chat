import { Component, inject } from '@angular/core';
import { HeaderComponent } from './components/dashboard/header/header.component';
import { SidenavComponent } from './components/dashboard/sidenav/sidenav.component';
import { QuillBubbleComponent } from './components/dashboard/quill-bubble/quill-bubble.component';
import { QuillEditorComponent } from 'ngx-quill';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, SidenavComponent, QuillEditorComponent, QuillBubbleComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'real-time-chat';  
}
