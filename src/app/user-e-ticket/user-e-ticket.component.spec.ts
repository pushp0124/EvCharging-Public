import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserETicketComponent } from './user-e-ticket.component';

describe('UserETicketComponent', () => {
  let component: UserETicketComponent;
  let fixture: ComponentFixture<UserETicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserETicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserETicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
