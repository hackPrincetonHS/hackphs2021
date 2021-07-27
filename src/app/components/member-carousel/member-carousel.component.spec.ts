import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberCarouselComponent } from './member-carousel.component';

describe('MemberCarouselComponent', () => {
  let component: MemberCarouselComponent;
  let fixture: ComponentFixture<MemberCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
