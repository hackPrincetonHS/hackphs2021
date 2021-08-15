import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundBottomComponent } from './background-bottom.component';

describe('BackgroundBottomComponent', () => {
  let component: BackgroundBottomComponent;
  let fixture: ComponentFixture<BackgroundBottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackgroundBottomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
