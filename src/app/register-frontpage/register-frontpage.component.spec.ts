import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFrontpageComponent } from './register-frontpage.component';

describe('RegisterFrontpageComponent', () => {
  let component: RegisterFrontpageComponent;
  let fixture: ComponentFixture<RegisterFrontpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterFrontpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFrontpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
