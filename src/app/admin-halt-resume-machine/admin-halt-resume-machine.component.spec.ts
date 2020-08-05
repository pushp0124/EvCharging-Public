import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHaltResumeMachineComponent } from './admin-halt-resume-machine.component';

describe('AdminHaltResumeMachineComponent', () => {
  let component: AdminHaltResumeMachineComponent;
  let fixture: ComponentFixture<AdminHaltResumeMachineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHaltResumeMachineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHaltResumeMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
