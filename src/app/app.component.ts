import { Component } from '@angular/core';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { QuillBubbleComponent } from './components/quill-bubble/quill-bubble.component';
import { QuillEditorComponent } from 'ngx-quill';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainComponent, HeaderComponent, SidenavComponent, QuillEditorComponent, QuillBubbleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'real-time-chat';
}
