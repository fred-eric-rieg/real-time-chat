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
  isShrunk = false;

  constructor(private renderer: Renderer2) {};


  toggleLeftMenu() {
    const element = this.leftmenu.nativeElement;
    if (element.classList.contains('shrink')) {
      this.renderer.removeClass(element, 'shrink');
      this.isShrunk = false;
    } else {
      this.renderer.addClass(element, 'shrink');
      this.isShrunk = true;
    }
  }
  
}
