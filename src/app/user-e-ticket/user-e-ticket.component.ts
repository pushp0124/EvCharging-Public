import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Booking } from '../model/booking';

@Component({
  selector: 'app-user-e-ticket',
  templateUrl: './user-e-ticket.component.html',
  styleUrls: ['./user-e-ticket.component.css']
})
export class UserETicketComponent implements OnInit {

  @ViewChild('myDiv', {static : false}) myDiv: ElementRef;
  constructor(@Inject(MAT_DIALOG_DATA) public booking: Booking) { }

  ngOnInit() {

  }

  printWindow(){
    let virtualWindow: any = window.open('', 'PRINT', 'height=400,width=800'); 
    virtualWindow.document.write('<html><head style = ><title>Your E-Ticket</title>'); 
    virtualWindow.document.write('</head><body>' + this.myDiv.nativeElement.innerHTML + '</body></html>'); 
    virtualWindow.document.close(); // necessary for IE >= 10 virtualWindow.focus(); // necessary for IE >= 10 
    setTimeout(t => { virtualWindow.print(); virtualWindow.close(); }, 1000); 
    // Give the DOM time to render images before printing. }
  }
}
