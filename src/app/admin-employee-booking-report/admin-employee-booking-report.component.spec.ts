import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmployeeBookingReportComponent } from './admin-employee-booking-report.component';

describe('AdminEmployeeBookingReportComponent', () => {
  let component: AdminEmployeeBookingReportComponent;
  let fixture: ComponentFixture<AdminEmployeeBookingReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEmployeeBookingReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEmployeeBookingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
