import { Component, CUSTOM_ELEMENTS_SCHEMA, Renderer2, ViewChild } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection, QuillEditorComponent } from 'ngx-quill';
import Quill from 'quill'
import Block from 'quill/blots/block';

Block.tagName = "DIV";
Quill.register(Block, true);

@Component({
  selector: 'app-quill-bubble',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [QuillEditorComponent],
  templateUrl: './quill-bubble.component.html',
  styleUrl: './quill-bubble.component.scss'
})
export class QuillBubbleComponent {

  @ViewChild(QuillEditorComponent) quillEditor!: QuillEditorComponent;

  constructor(private renderer: Renderer2) {}

  blurred = false
  focused = false

  created(event: Quill | any) {

  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection | any) {

  }

  focus($event: any) {
    this.focused = true;
    this.blurred = false;
  }

  nativeFocus($event: any) {

  }

  blur($event: any) {
    console.log('blur', $event);
    this.focused = false;
    this.blurred = true;
  }


  nativeBlur($event: any) {

  }

}
