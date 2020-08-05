import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Booking } from '../model/booking';

@Component({
  selector: 'app-user-e-ticket',
  templateUrl: './user-e-ticket.component.html',
  styleUrls: ['./user-e-ticket.component.css']
})
export class UserETicketComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public booking : Booking) { }

  ngOnInit() {
    
  }

}
