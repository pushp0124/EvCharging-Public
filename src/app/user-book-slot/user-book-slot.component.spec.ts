import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookSlotComponent } from './user-book-slot.component';

describe('UserBookSlotComponent', () => {
  let component: UserBookSlotComponent;
  let fixture: ComponentFixture<UserBookSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBookSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBookSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
