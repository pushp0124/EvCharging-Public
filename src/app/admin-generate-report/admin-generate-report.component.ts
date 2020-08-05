import { Component, OnInit } from '@angular/core';
import { Station } from '../model/station';
import { ChargingService } from '../charging.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ReportFormat } from '../model/reportFormat';
import { DatePipe } from '@angular/common';
import { Booking } from '../model/booking';
import { Label, Color } from 'ng2-charts';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { MachineType } from '../model/machineType';

@Component({
  selector: 'app-admin-generate-report',
  templateUrl: './admin-generate-report.component.html',
  styleUrls: ['./admin-generate-report.component.css']
})
export class AdminGenerateReportComponent implements OnInit {

  stations: Station[] = [];
  selectedStation : Station;
  minFromDate = new Date('2020-01-01');
  minToDate = this.minFromDate;
  selectedFromDate : Date;
  selectedToDate : Date;
  reports : ReportFormat[];
  dataLoaded = false;
  selectedRowIndex : number = -1;
  bookings: Booking[];
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{
      ticks : {
        beginAtZero: true,
        callback: function(value : number) {if (value % 1 === 0) {return value;}}
      }
    }] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    },
    
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [], 
      label: 'Machines Booking Data', 
      barThickness: 60,
      barPercentage: 1.0},
    
  ];

  barChartColors: Color[] = [
    { backgroundColor: '#24d2b5' }
  ]

  constructor(private chargingService: ChargingService, private datePipe : DatePipe) { 
  }

  ngOnInit() {

    this.chargingService.getAllStations().subscribe((stations) => {
      this.stations = stations;
      this.selectedStation= stations[0];
    }, (stationError) => {
      alert(stationError.error.message);
    })
  }

  onFromDateChange(selectedDate : Date) {
     this.selectedFromDate = selectedDate;
     this.minToDate = this.selectedFromDate;
     
     if(this.selectedToDate != undefined && (this.selectedToDate < this.selectedFromDate)) {
          this.selectedToDate = undefined;
     }
     if(this.selectedFromDate != undefined && this.selectedToDate != undefined) {
      this.dataLoaded = false;
      this.generateBookingsReport();
      this.selectedRowIndex = -1;
    }
  }

  onToDateChange(selectedDate : Date) {
    this.selectedToDate = selectedDate;
    if(this.selectedFromDate != undefined && this.selectedToDate != undefined) {
      this.dataLoaded = false;
      this.generateBookingsReport();
      this.selectedRowIndex = -1;
    }
 }

 stationSelectionListClicked(selectedStation : Station) {
   
  this.selectedStation = selectedStation;
  if(this.selectedFromDate != undefined && this.selectedToDate != undefined) {
    this.dataLoaded = false;
    this.generateBookingsReport();
    this.selectedRowIndex = -1;
  }
}
 generateBookingsReport() {
   
   let transformedFromDate  = this.datePipe.transform(this.selectedFromDate ,this.chargingService.dateFormatter);

   let transformedToDate = this.datePipe.transform(this.selectedToDate ,this.chargingService.dateFormatter);
   
   this.chargingService.generateBookingsReport(transformedFromDate,transformedToDate,this.selectedStation.stationId).subscribe((reports) => {
       this.reports = reports;
       this.dataLoaded = true;
       this.barChartLabels = [];
       this.barChartData[0].data = [];

       reports.forEach(report=> {
        
          this.barChartData[0].data.push(report.bookingsCount)
      
         this.barChartLabels.push(report.bookedMachine.machineName);
       });
       console.log(this.barChartLabels, this.barChartData);
   })
 }


 machineBookingDetail(reportIndex : number) {

  let report = this.reports[reportIndex];
  this.selectedRowIndex = reportIndex;
  let transformedFromDate  = this.datePipe.transform(this.selectedFromDate ,this.chargingService.dateFormatter);

  let transformedToDate = this.datePipe.transform(this.selectedToDate ,this.chargingService.dateFormatter);
 
   this.chargingService.generateMachineBookingsReport(transformedFromDate,transformedToDate,report.bookedMachine.machineId).subscribe((bookings) => {
        this.bookings = bookings;
        console.log(this.bookings);
   })
 }

 onSelect(event) {
  console.log(event);
  }



  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
   
  }

}

