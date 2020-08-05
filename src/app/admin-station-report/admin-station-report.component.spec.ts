import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStationReportComponent } from './admin-station-report.component';

describe('AdminStationReportComponent', () => {
  let component: AdminStationReportComponent;
  let fixture: ComponentFixture<AdminStationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
