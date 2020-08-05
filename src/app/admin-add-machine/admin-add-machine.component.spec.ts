import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddMachineComponent } from './admin-add-machine.component';

describe('AdminAddMachineComponent', () => {
  let component: AdminAddMachineComponent;
  let fixture: ComponentFixture<AdminAddMachineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddMachineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
