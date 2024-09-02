import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  @ViewChild('leftmenu') leftmenu!: ElementRef;
  @ViewChild('content') content!: ElementRef;

  isShrunk = false;

  constructor(private renderer: Renderer2) {};


  toggleLeftMenu() {
    const leftMenuEl = this.leftmenu.nativeElement;
    const contentEl = this.content.nativeElement;
    if (leftMenuEl.classList.contains('shrink')) {
      this.renderer.addClass(contentEl, 'hide-overflow');
      this.renderer.removeClass(leftMenuEl, 'shrink');
      this.isShrunk = false;
    } else {
      this.renderer.removeClass(contentEl, 'hide-overflow');
      this.renderer.addClass(leftMenuEl, 'shrink');
      this.isShrunk = true;
    }
  }
  
}
