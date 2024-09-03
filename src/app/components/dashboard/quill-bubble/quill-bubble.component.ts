import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, HostListener, Output, Renderer2, SecurityContext, ViewChild } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection, QuillEditorComponent } from 'ngx-quill';
import Quill from 'quill'
import Block from 'quill/blots/block';
import { DataService } from '../../../shared/services/data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

Block.tagName = "DIV";
Quill.register(Block, true);

@Component({
  selector: 'app-quill-bubble',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [QuillEditorComponent, MatButtonModule, MatIconModule],
  templateUrl: './quill-bubble.component.html',
  styleUrl: './quill-bubble.component.scss'
})
export class QuillBubbleComponent {
  blurred = false;
  focused = false;
  isEmpty = true;

  @Output() messageSent = new EventEmitter<boolean>();

  @ViewChild(QuillEditorComponent) quillEditor!: QuillEditorComponent;

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.checkKeyCombination(event);
  }


  constructor(private renderer: Renderer2, private dataService: DataService, private sanitizer: DomSanitizer) {}


  private checkKeyCombination(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'Enter') {
      this.sanitizeMessage();
    }
  }

  created(event: Quill | any) {
    this.renderer.setAttribute(event.root, "data-placeholder", "Write something and send with control + enter...");
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection | any) {
    const editor = event.editor.root.innerHTML;
    if (editor != "<div><br></div>") {
      this.isEmpty = false;
    } else {
      this.isEmpty = true;
    }
  }

  focus($event: any) {
    this.focused = true;
    this.blurred = false;
  }

  blur($event: any) {
    this.focused = false;
    this.blurred = true;
  }


  sanitizeMessage() {
    const rawContent = this.quillEditor.quillEditor.root.innerHTML;
    if (rawContent != '<div><br></div>') {
      let content = this.sanitizer.sanitize(SecurityContext.HTML, rawContent);
      this.dataService.sendMessage(content || "***Content contained XSS - du Schwein!***");
      this.messageSent.emit(true);
      this.quillEditor.quillEditor.setText('');
      this.messageSent.emit(false);
    } else {
      console.log("Nothing there...")
    }
  }
}
