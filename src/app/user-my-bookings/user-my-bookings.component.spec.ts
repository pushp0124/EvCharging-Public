import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMyBookingsComponent } from './user-my-bookings.component';

describe('UserMyBookingsComponent', () => {
  let component: UserMyBookingsComponent;
  let fixture: ComponentFixture<UserMyBookingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMyBookingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMyBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
