import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewSlotComponent } from './admin-view-slot.component';

describe('AdminViewSlotComponent', () => {
  let component: AdminViewSlotComponent;
  let fixture: ComponentFixture<AdminViewSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminViewSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
