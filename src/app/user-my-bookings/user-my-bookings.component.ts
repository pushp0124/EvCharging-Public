import { Component, OnInit } from '@angular/core';
import { ChargingService } from '../charging.service';
import { Booking } from '../model/booking';
import { DatePipe } from '@angular/common';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-user-my-bookings',
  templateUrl: './user-my-bookings.component.html',
  styleUrls: ['./user-my-bookings.component.css']
})
export class UserMyBookingsComponent implements OnInit {

  bookings: Booking[];
  currentDate : string;

  selectedBookingType: number;
  bookingTypes: string[] = ['Current Bookings', 'All Bookings'];
  constructor(private chargingService : ChargingService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.currentDate = this.datePipe.transform(new Date(),this.chargingService.dateFormatter)
    this.selectedBookingType = 1;
    this.chargingService.getEmployeeAllBookings(this.chargingService.loggedInUser.employeeId).subscribe((bookings) => {
        this.bookings = bookings;
    }, (bookingErrorData) => {
      alert(bookingErrorData.error.message);
    })
  }

  

}
