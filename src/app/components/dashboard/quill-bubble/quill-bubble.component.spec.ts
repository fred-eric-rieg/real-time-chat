import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuillBubbleComponent } from './quill-bubble.component';

describe('QuillBubbleComponent', () => {
  let component: QuillBubbleComponent;
  let fixture: ComponentFixture<QuillBubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuillBubbleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuillBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
