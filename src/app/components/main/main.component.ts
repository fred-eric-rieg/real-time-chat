import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, Signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Chat, DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule, MatMenuModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  @ViewChild('leftmenu') leftmenu!: ElementRef;
  @ViewChild('content') content!: ElementRef;

  isShrunk = false;

  chat!: Signal<Chat[]>;

  constructor(private renderer: Renderer2, public dataService: DataService) {

  };


  ngOnInit(): void {
    this.chat = this.dataService.getChats();
  }


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
