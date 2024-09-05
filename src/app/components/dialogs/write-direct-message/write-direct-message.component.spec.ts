import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteDirectMessageComponent } from './write-direct-message.component';

describe('WriteDirectMessageComponent', () => {
  let component: WriteDirectMessageComponent;
  let fixture: ComponentFixture<WriteDirectMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WriteDirectMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WriteDirectMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
