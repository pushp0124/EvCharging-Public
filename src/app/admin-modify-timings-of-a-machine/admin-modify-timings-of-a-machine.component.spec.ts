import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModifyTimingsOfAMachineComponent } from './admin-modify-timings-of-a-machine.component';

describe('AdminModifyTimingsOfAMachineComponent', () => {
  let component: AdminModifyTimingsOfAMachineComponent;
  let fixture: ComponentFixture<AdminModifyTimingsOfAMachineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminModifyTimingsOfAMachineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminModifyTimingsOfAMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
