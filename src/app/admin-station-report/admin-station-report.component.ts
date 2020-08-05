import { Component, OnInit } from '@angular/core';
import { MultiDataSet, Label, SingleDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { Station } from '../model/station';
import { ChargingService } from '../charging.service';
import { StationReport } from '../model/stationReport';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-admin-station-report',
  templateUrl: './admin-station-report.component.html',
  styleUrls: ['./admin-station-report.component.css']
})
export class AdminStationReportComponent implements OnInit {


  minFromDate = new Date('2020-01-01');
  minToDate = this.minFromDate;
  selectedFromDate : Date;
  selectedToDate : Date;
  stationsReport : StationReport[];
  dataLoaded = false;
   // Doughnut
   public doughnutChartLabels: Label[] = ['Total Booking Available Hours', 'Total Booking Hours'];

   public doughnutChartList : SingleDataSet[] = [];
   public doughnutChartType: ChartType = 'doughnut';
 
   constructor(private chargingService : ChargingService,  private datePipe : DatePipe) { }
 
   ngOnInit() {

   }
 
   // events
   public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
     console.log(event, active);
   }
 
   public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
     console.log(event, active);
   }
   onFromDateChange(selectedDate : Date) {
    this.selectedFromDate = selectedDate;
    this.minToDate = this.selectedFromDate;
    
    if(this.selectedToDate != undefined && (this.selectedToDate < this.selectedFromDate)) {
         this.selectedToDate = undefined;
    }
    if(this.selectedFromDate != undefined && this.selectedToDate != undefined) {
     this.dataLoaded = false;
     this.generateStationsReport();
    
   }
 }

 onToDateChange(selectedDate : Date) {
   this.selectedToDate = selectedDate;
   if(this.selectedFromDate != undefined && this.selectedToDate != undefined) {
     this.dataLoaded = false;
     this.generateStationsReport();
    
   }
  }

   generateStationsReport() {
   
    let transformedFromDate  = this.datePipe.transform(this.selectedFromDate ,this.chargingService.dateFormatter);
 
    let transformedToDate = this.datePipe.transform(this.selectedToDate ,this.chargingService.dateFormatter);
    
    this.chargingService.getAllStationsReport(transformedFromDate,transformedToDate).subscribe((stationsReport) => {
        this.stationsReport = stationsReport;
        this.dataLoaded = true;
      
        this.doughnutChartList = [];
 
        stationsReport.forEach(report=> {
         let doughnutChartData = [];
         doughnutChartData.push(Math.ceil(report.totalBookingAvailableMins / 60));
         doughnutChartData.push(Math.ceil(report.totalBookingMins / 60)); 
         this.doughnutChartList.push(doughnutChartData);
          
        });
        
    },(stationReportError)=> {
      this.dataLoaded = true;
      alert(stationReportError.error.message);
    })
  }
 
}

