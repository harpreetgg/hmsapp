import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentTimingsComponent } from './appointment-timings.component';

describe('AppointmentTimingsComponent', () => {
  let component: AppointmentTimingsComponent;
  let fixture: ComponentFixture<AppointmentTimingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentTimingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentTimingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
