import { Component, OnInit } from '@angular/core';
import { BookingStatus } from '../model/bookingStatus';
import { Booking } from '../model/booking';
import { Label } from 'ng2-charts';
import { ChartDataSets, ChartType, ChartOptions } from 'chart.js';
import { ChargingService } from '../charging.service';
import { DatePipe } from '@angular/common';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-user-booking-report',
  templateUrl: './user-booking-report.component.html',
  styleUrls: ['./user-booking-report.component.css']
})
export class UserBookingReportComponent implements OnInit {

  bookings: Booking[];
  dataLoaded ;
  errorMessage : string
  successMessage : string;
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{}], yAxes: [{
        ticks: {
          beginAtZero: true,
          callback: function (value: number) { if (value % 1 === 0) { return value; } }
        }
      }]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        formatter: function (value, context) {
          if (value == 0)
            return "";
        }
      }
    },
    legend : {
      position : "bottom"
    }

  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    {
      data: [],
      label: 'Booking Status BOOKED',
    },
    {
      data: [],
      label: 'Booking Status CANCELLED',

    },
    {
      data: [],
      label: 'Booking Status RESCHEDULED',
    },


  ];

  // barChartColors: Color[] = [
  //   { backgroundColor: '#24d2b5' }
  // ]

  constructor(private chargingService: ChargingService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.generateEmployeeReport(this.chargingService.loggedInUser.employeeId)
  }


  generateEmployeeReport(employeeId:number) {
    this.barChartLabels = []
    this.dataLoaded = false
    this.barChartData = [
      {
        data: [],
        label: 'Booking Status BOOKED',
      },
      {
        data: [],
        label: 'Booking Status CANCELLED',
  
      },
      {
        data: [],
        label: 'Booking Status RESCHEDULED',
      },
  
  
    ];
    this.chargingService.getEmployeeAllBookings(employeeId).subscribe((bookings) => {

      this.bookings = this.sortBookings(bookings);

      var data;
      console.log(this.bookings)
      this.bookings.forEach(booking => {

        console.log(booking.status)
        let transformedDate = this.datePipe.transform(booking.bookedDate, this.chargingService.dateFormatter);
        let index = this.barChartLabels.findIndex(x => {
          return x == transformedDate
        })
        if (index == -1) {
          this.barChartLabels.push(transformedDate);
         
            this.barChartData[0].data.push(0);
          
            this.barChartData[1].data.push(0);;
         
            this.barChartData[2].data.push(0);
          
          index = this.barChartLabels.length - 1;
        }
        if (booking.status == BookingStatus.BOOKED) {
          data = this.barChartData[0].data;
        } else if (booking.status == BookingStatus.CANCELLED) {
          data = this.barChartData[1].data;
        } else {
          data = this.barChartData[2].data;
        }
        data[index] = +data[index] + 1;

        if (booking.status == BookingStatus.BOOKED) {
          this.barChartData[0].data = data;
        } else if (booking.status == BookingStatus.CANCELLED) {
          this.barChartData[1].data = data;
        } else {
          this.barChartData[2].data = data;
        }
       console.log(this.barChartData)
        
      });
      // this.barChartData[0].data.push(0)
      // this.barChartData[1].data.push(0)
      // this.barChartData[2].data.push(0)
      console.log(this.barChartLabels)
      this.dataLoaded = true

    }, (reportError) => {
      this.errorMessage = reportError.error.message
    })

  }
  sortBookings(bookings: Booking[]) {
    
    let sortedArray = bookings.sort((booking1, booking2) => {
      if (booking1.bookedDate < booking2.bookedDate) {
        return -1;
      } else if (booking1.bookedDate > booking2.bookedDate) {
        return 1;
      }
      return 0;
    })

    return sortedArray;
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }



}
