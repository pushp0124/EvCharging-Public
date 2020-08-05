import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRemoveMachineComponent } from './admin-remove-machine.component';

describe('AdminRemoveMachineComponent', () => {
  let component: AdminRemoveMachineComponent;
  let fixture: ComponentFixture<AdminRemoveMachineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRemoveMachineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRemoveMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
