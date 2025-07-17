import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsLiveComponent } from './appointments-live.component';

describe('AppointmentsLiveComponent', () => {
  let component: AppointmentsLiveComponent;
  let fixture: ComponentFixture<AppointmentsLiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentsLiveComponent]
    });
    fixture = TestBed.createComponent(AppointmentsLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
