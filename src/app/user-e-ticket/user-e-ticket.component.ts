import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Booking } from '../model/booking';

@Component({
  selector: 'app-user-e-ticket',
  templateUrl: './user-e-ticket.component.html',
  styleUrls: ['./user-e-ticket.component.css']
})
export class UserETicketComponent implements OnInit {

  @ViewChild('printContent', { static: false }) printContent;

  constructor(@Inject(MAT_DIALOG_DATA) public booking: Booking) { }

  ngOnInit() {

  }

  printWindow() {
    let virtualWindow: any = window.open('', 'PRINT', 'height=400,width=800');

    // const decorationHtml = 
    const content = this.printContent.nativeElement.innerHTML;
    console.log(content)
    // virtualWindow.document.body.innerHTML = content;
    // virtualWindow.document.write('<html><head><title>' + content.caption + '</title>');
    // virtualWindow.document.write('<link href="Your-Path/bootstrap.min.css" rel="stylesheet" />');
    // virtualWindow.document.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" media="screen,print"/>');
    // virtualWindow.document.write('</head><body class=\'visible-print\'>');
    // virtualWindow.document.close(); // necessary for IE >= 10 virtualWindow.focus(); // necessary for IE >= 10 

    var strPrint = '';
  strPrint += '<html>';
  strPrint += '<link rel="stylesheet" href="style.css" />';
  strPrint += '</head><body>';
  strPrint += '<h1>Test</h1>';
  strPrint += content;
  strPrint += '</body></html>';
    setTimeout(t => { virtualWindow.print(); virtualWindow.close(); }, 1000);

    // const restorePage = document.body.innerHTML;
    // ;
    // document.body.innerHTML = content;
    // window.print();
    // // document.body.innerHTML = restorePage;
    // setTimeout(t => { window.close(); }, 1000);

    // Give the DOM time to render images before printing. }
  }

}